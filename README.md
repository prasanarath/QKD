# 🔐 Quantum Key Distribution (QKD) – BB84 Protocol Simulation
<img width="1907" height="1029" alt="image" src="https://github.com/user-attachments/assets/a7baef9f-68cc-4414-9032-5cc78ba4564d" />

<img width="1859" height="965" alt="image" src="https://github.com/user-attachments/assets/38e868fa-f095-44a2-86b7-23809bcd4cfc" />



This project is a **web-based simulation** demonstrating the working of the **BB84 Quantum Key Distribution (QKD) protocol** — one of the foundational algorithms in quantum cryptography. The simulation visually represents the key exchange process using **HTML, CSS, and JavaScript**, helping users understand how quantum mechanics ensures secure communication.

🌐 **Live Demo:** [QKD BB84 Simulator](https://prasanarath.github.io/QKD/)

---

## 🧠 Overview

The **BB84 protocol**, proposed by Bennett and Brassard in 1984, is the first quantum key distribution scheme that allows two parties to securely share a secret key using quantum bits (qubits).  
This project provides an **interactive simulation** that walks through each step of the BB84 process — from photon polarization to key reconciliation — in an intuitive and visual way.

The website also includes a **"Know More"** section that explains the **theoretical background** of BB84 and how it ensures unconditional security in quantum communication.

---

## ⚙️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Styling:** Custom CSS (no frameworks used)  
- **Deployment:** GitHub Pages  

---

## 🧩 Features

- 🎯 **Visual Simulation:** Step-by-step representation of the BB84 protocol  
- 🔑 **Random Key Generation:** Shows how Alice and Bob generate quantum keys  
- 🧭 **Basis Comparison:** Demonstrates how mismatched bases are discarded  
- 🕵️ **Eavesdrop Detection:** Illustrates how Eve’s interference alters qubits  
- 📘 **Detailed Explanation Page:** Accessed via the “Know More” button on the top navigation bar  
- 💡 **Educational Tool:** Great for students and enthusiasts learning quantum cryptography  

---

## 🚀 Installation & Usage

You can view the simulator online using the link above.  
If you wish to run it locally:

```bash
# Clone the repository
git clone https://github.com/prasanarath/QKD.git

# Navigate into the folder
cd QKD

# Open the simulator
open BB84/index.html
# (or simply double-click index.html in your file explorer)
