import streamlit as st
import google.generativeai as genai
import geocoder
import requests
import folium
from streamlit_folium import st_folium
import speech_recognition as sr

# Configure Gemini API
API_KEY = "AIzaSyDsiBNzEwhQUra6ory6MGhXH8wr01Tq8Cg"
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("models/gemini-1.5-flash")

# Page Config
st.set_page_config(page_title="Medical Nutrition Advisor", layout="wide", page_icon="🩺")

# Header
st.markdown("""
    <style>
        .main-title {
            font-size: 40px;
            font-weight: 700;
            color: #1F4172;
            text-align: center;
        }
        .subtitle {
            font-size: 18px;
            color: #5A5A5A;
            text-align: center;
            margin-bottom: 30px;
        }
    </style>
""", unsafe_allow_html=True)

st.markdown('<div class="main-title">🩺 Medical Nutrition Advisor</div>', unsafe_allow_html=True)
st.markdown('<div class="subtitle">Powered by Gemini 1.5 Flash – Your AI Nutritionist</div>', unsafe_allow_html=True)

st.info("💬 **Disclaimer:** This chatbot provides general nutrition tips. Always consult a medical professional for serious concerns.")

# Session state for chat
if "messages" not in st.session_state:
    st.session_state.messages = []

# Sidebar - Health Condition & Symptom Checker
with st.sidebar:
    st.header("🧾 Tools & Shortcuts")

    with st.expander("❓ Common Conditions"):
        conditions = ["Diabetes", "High Blood Pressure", "Anemia", "Thyroid", "Cholesterol"]
        for condition in conditions:
            if st.button(condition):
                prompt = f"I have {condition}"
                st.session_state.messages.append({"role": "user", "content": prompt})
                response = model.generate_content(
                    f"As a certified nutritionist, provide dietary recommendations for someone with the condition: {condition}. Include foods to eat and avoid."
                )
                st.session_state.messages.append({"role": "assistant", "content": response.text})

    st.markdown("---")

    st.subheader("🩺 Symptom Checker")
    symptoms = st.multiselect("Select symptoms you're experiencing:", 
        ["🌡️ Body temperature", "Cold", "Cough", "Lazy", "Unlike to eat food"]
    )
    if symptoms:
        user_symptoms = ", ".join(symptoms)
        st.session_state.messages.append({"role": "user", "content": f"Symptoms: {user_symptoms}"})
        response = model.generate_content(
            f"A user has the following symptoms: {user_symptoms}. What possible health condition might they have? Provide dietary and medical suggestions."
        )
        st.session_state.messages.append({"role": "assistant", "content": response.text})

        # Location & Hospital Map
        g = geocoder.ip('me')
        if g.ok:
            lat, lon = g.latlng
            st.success(f"📍 Location Detected: {lat:.4f}, {lon:.4f}")

            # Overpass API for hospitals
            overpass_url = "https://overpass-api.de/api/interpreter"
            query = f"""
            [out:json];
            node[amenity=hospital](around:5000,{lat},{lon});
            out;
            """
            res = requests.get(overpass_url, params={'data': query})
            hospitals = res.json().get("elements", [])

            st.subheader("🏥 Nearby Hospitals")
            m = folium.Map(location=[lat, lon], zoom_start=13)
            folium.Marker([lat, lon], tooltip="You are here", icon=folium.Icon(color='blue')).add_to(m)
            for hospital in hospitals:
                name = hospital.get("tags", {}).get("name", "Unnamed Hospital")
                folium.Marker(
                    [hospital["lat"], hospital["lon"]],
                    tooltip=name,
                    icon=folium.Icon(color='red', icon='plus-sign')
                ).add_to(m)
            st_folium(m, width=600, height=400)
        else:
            st.warning("⚠️ Could not determine your location.")

# Chat history
st.markdown("---")
st.subheader("📋 Conversation")
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# User input prompt
if prompt := st.chat_input("Type your condition or question (e.g., 'I have thyroid and fatigue')"):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    try:
        response = model.generate_content(
            f"As a certified nutritionist, provide dietary recommendations for someone with the condition: {prompt}. Include foods to eat and avoid."
        )
        reply = response.text
    except Exception as e:
        reply = f"❌ Error from Gemini: {e}"

    st.session_state.messages.append({"role": "assistant", "content": reply})
    with st.chat_message("assistant"):
        st.markdown(reply)

# Language Translation
st.markdown("---")
with st.container():
    st.subheader("🌐 Translate Assistant Response")
    col1, col2 = st.columns([2, 1])
    with col1:
        lang_choice = st.selectbox("Choose language:", ["None", "Hindi", "Telugu"])
    with col2:
        if st.button("🔁 Translate"):
            if st.session_state.messages:
                last_msg = st.session_state.messages[-1]
                if last_msg["role"] == "assistant":
                    to_translate = last_msg["content"]
                    if lang_choice == "Hindi":
                        prompt = f"Translate the following medical advice to Hindi. Reply only in Hindi:\n\n{to_translate}"
                    elif lang_choice == "Telugu":
                        prompt = f"Translate the following medical advice to Telugu. Reply only in Telugu:\n\n{to_translate}"
                    else:
                        st.warning("Please select a valid language.")
                        prompt = None

                    if prompt:
                        try:
                            trans_resp = model.generate_content(prompt)
                            translated_text = trans_resp.text
                            st.session_state.messages[-1]["content"] = translated_text
                            st.rerun()
                        except Exception as e:
                            st.error(f"Translation failed: {e}")
            else:
                st.warning("No assistant response found to translate.")

# Voice Assistant
st.markdown("---")
st.subheader("🎙️ Voice Assistant")
if st.button("🎤 Start Listening"):
    recognizer = sr.Recognizer()
    mic = sr.Microphone()
    with mic as source:
        st.info("Listening... Speak now.")
        audio = recognizer.listen(source, phrase_time_limit=5)
        st.success("Processing...")

    try:
        query = recognizer.recognize_google(audio)
        st.write(f"🗣️ You said: **{query}**")

        response = model.generate_content(
            f"The user asked: '{query}'. Respond in a helpful way, prioritizing health/nutrition if relevant."
        )
        answer = response.text
        st.session_state.messages.append({"role": "user", "content": query})
        st.session_state.messages.append({"role": "assistant", "content": answer})
        st.markdown(answer)

    except sr.UnknownValueError:
        st.error("😕 Sorry, could not understand your voice.")
    except sr.RequestError as e:
        st.error(f"⚠️ Could not request results; {e}")
