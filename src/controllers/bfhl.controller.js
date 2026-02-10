import axios from "axios";
import { ApiError } from "../utils/ApiError.js";

const EMAIL = "divisha2116.be23@chitkara.edu.in";

const bfhlController = async (req, res) => {
  try {
    const keys = Object.keys(req.body);
    if (keys.length !== 1) {
      throw new ApiError(400, "Exactly one key required");
    }

    const key = keys[0];
    let data;

    // 🔹 Fibonacci
    if (key === "fibonacci") {
      const n = req.body[key];
      if (typeof n !== "number" || n < 0) {
        throw new ApiError(400, "Invalid fibonacci input");
      }
      data = [0, 1];
      for (let i = 2; i < n; i++) {
        data.push(data[i - 1] + data[i - 2]);
      }
    }

    // 🔹 Prime
    else if (key === "prime") {
      const arr = req.body[key];
      if (!Array.isArray(arr)) {
        throw new ApiError(400, "Invalid prime input");
      }
      const isPrime = (num) => {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
          if (num % i === 0) return false;
        }
        return true;
      };
      data = arr.filter(isPrime);
    }

    // 🔹 HCF
    else if (key === "hcf") {
      const arr = req.body[key];
      if (!Array.isArray(arr)) {
        throw new ApiError(400, "Invalid hcf input");
      }
      const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
      data = arr.reduce((a, b) => gcd(a, b));
    }

    // 🔹 LCM
    else if (key === "lcm") {
      const arr = req.body[key];
      if (!Array.isArray(arr)) {
        throw new ApiError(400, "Invalid lcm input");
      }
      const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
      const lcm = (a, b) => (a * b) / gcd(a, b);
      data = arr.reduce((a, b) => lcm(a, b));
    }

    // 🔹 AI (FIXED GEMINI)
    else if (key === "AI") {
      const question = req.body[key];
      if (typeof question !== "string") {
        throw new ApiError(400, "Invalid AI input");
      }

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: question }]
            }
          ]
        }
      );

      data =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text
          ?.trim()
          ?.split(/\s+/)[0] || "Unknown";
    }

    else {
      throw new ApiError(400, "Invalid key");
    }

    // ✅ SUCCESS RESPONSE (PDF COMPLIANT)
    res.status(200).json({
      is_success: true,
      official_email: EMAIL,
      data
    });

  } catch (error) {
    res.status(error.statusCode || 500).json({
      is_success: false,
      error: error.message || "Internal Server Error"
    });
  }
};

export { bfhlController };