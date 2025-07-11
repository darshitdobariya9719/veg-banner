import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import basketImage from "./assets/veg-basket.png";
import whatsappIcon from "./assets/WhatsApp.png";
const vegImages = {
  Bhindi: require("./assets/vegetables/Bhindi.png"),
  Choli: require("./assets/vegetables/Choli.png"),
  Flower: require("./assets/vegetables/Flower.png"),
  Cabbage: require("./assets/vegetables/Cabbage.png"),
  Guvar: require("./assets/vegetables/Guvar.png"),
  SpongeGourd: require("./assets/vegetables/SpongeGourd.png"),
  Dudhi: require("./assets/vegetables/Dudhi.png"),
  // Onion: require("./assets/vegetables/Onion.png"),
  // Tomato: require("./assets/vegetables/Tomato.png"),
  // Carrot: require("./assets/vegetables/Carrot.png"),
  // Potato: require("./assets/vegetables/Potato.png"),
  Chili: require("./assets/vegetables/Chili.png"),
  Onion: "",
  Tomato: "",
  Carrot: "",
  Potato: "",
};

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [query]);

  return matches;
};

export default function VegetableBanner() {
  const [selectedVeg, setSelectedVeg] = useState("Bhindi");
  const [isPriceShow, setIsPriceShow] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState("9723765314");
  const [language, setLanguage] = useState("en");
  const [location, setLocation] = useState("Nikol");
  const [prices, setPrices] = useState([{ quantity: "", price: "" }]);
  const [bannerText, setBannerText] = useState("");
  const bannerRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const translations = {
    en: {
      heading: (veg) => `Fresh ${veg} Available`,
      location: (loc) => `📍 Now Available in ${loc}`,
      limited: "🔥 Limited Stock Available",
      delivered: "⏰ Delivered before today 10 PM",
      order: "🛒 Order Now on WhatsApp!",
    },
    gu: {
      heading: (veg) => `${veg} ઉપલબ્ધ છે`,
      location: (loc) => `📍 હવે ${loc} માં`,
      limited: "🔥 મર્યાદિત સ્ટોક ઉપલબ્ધ",
      delivered: "⏰ આજે રાત્રે 10 વાગ્યા પહેલા ડિલિવરી",
      order: "🛒 અત્યારેજ ઓર્ડર કરો WhatsApp પર!",
    },
  };

  const vegNameMap = {
    Bhindi: { en: "Okra", gu: "ભીંડા", ex: "ઓર્ગેનિક તાજા" },
    Choli: { en: "Field Beans", gu: "ચોળી", ex: "તાજી" },
    Flower: { en: "Cauliflower", gu: "ફ્લાવર", ex: "તાજા" },
    Cabbage: { en: "Cabbage", gu: "કોબી", ex: "તાજી" },
    Guvar: { en: "Cluster Beans", gu: "ગવાર", ex: "તાજો" },
    SpongeGourd: { en: "Sponge Gourd", gu: "તુરીયા ", ex: "તાજા" },
    Dudhi: { en: "Bottle Gourd", gu: "દૂધી", ex: "તાજી" },
    Chili: { en: "Chili", gu: "મરચાં", ex: "તાજાં" },
    // Onion: { en: "Onion", gu: "ડુંગળી", ex: "તાજી" },
    // Tomato: { en: "Tomato", gu: "ટામેટા", ex: "તાજા" },
    // Carrot: { en: "Carrot", gu: "ગાજર", ex: "તાજા" },
    // Potato: { en: "Potato", gu: "બટાટા", ex: "તાજા" },
  };

  const getVegEmoji = (veg) => {
    const map = {
      Carrot: "🥕",
      Tomato: "🍅",
      Onion: "🧅",
      Potato: "🥔",
      Spinach: "🥬",
      Bhindi: "🟢",
      Guvar: "🌿",
      Choli: "🫛",
      Flower: "🥦",
      Cabbage: "🥬",
      Chili: "🌶️",
      SpongeGourd: "🥒",
      Dudhi: "🥒",
    };
    return map[veg] || "🥗";
  };

  const handlePriceChange = (index, field, value) => {
    const newPrices = [...prices];
    newPrices[index][field] = value;
    setPrices(newPrices);
  };

  const addPriceRow = () => {
    setPrices([...prices, { quantity: "", price: "" }]);
  };

  const handleGenerate = () => {
    if (!location || !selectedVeg)
      return alert("Please enter location and select vegetable");
    const validPrices = prices.filter((p) => p.quantity && p.price);
    if (validPrices.length === 0 && isPriceShow !== false)
      return alert("Add at least one price variant");

    const text =
      `🥬 ${selectedVeg} Now Available in ${location}\n\n` +
      validPrices.map((p) => `📦 ${p.quantity} - ₹${p.price}`).join("\n") +
      `\n\n⏰ Delivered before today 10 PM\n🛒 Order Now on WhatsApp!`;

    setBannerText(text);
  };

  const downloadBanner = async () => {
    if (!bannerRef.current) return;
    const canvas = await html2canvas(bannerRef.current, { useCORS: true });
    const link = document.createElement("a");
    link.download = "vegetable-banner.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.inputSection}>
        <h2
          style={{
            ...styles.heading,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          🥬 Vegetable Banner Generator
        </h2>
        <input
          type="text"
          placeholder="Enter your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={styles.input}
        />
        <select
          value={selectedVeg}
          onChange={(e) => setSelectedVeg(e.target.value)}
          style={styles.select}
        >
          {Object.keys(vegNameMap).map((vegKey) => (
            <option key={vegKey} value={vegKey}>
              {vegNameMap[vegKey]["gu"]}
            </option>
          ))}
        </select>

        {prices.map((item, index) => (
          <div key={index} style={styles.priceRow}>
            <input
              type="text"
              placeholder="Quantity (e.g. 1kg)"
              value={item.quantity}
              onChange={(e) =>
                handlePriceChange(index, "quantity", e.target.value)
              }
              style={styles.inputHalf}
            />
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) =>
                handlePriceChange(index, "price", e.target.value)
              }
              style={styles.inputHalf}
            />
          </div>
        ))}
        <div style={styles.priceSwitcher}>
          <label htmlFor="showPrices" style={styles.languageLabel}>
            Show Prices:
          </label>
          <input
            type="checkbox"
            id="showPrices"
            checked={isPriceShow}
            onChange={(e) => setIsPriceShow(e.target.checked)}
          />
        </div>
        <button onClick={addPriceRow} style={styles.addBtn}>
          + Add More Price
        </button>
        <button onClick={handleGenerate} style={styles.generateBtn}>
          Generate Banner
        </button>
      </div>
      {bannerText && (
        <>
          <div style={styles.customizationSection}>
            {/* WhatsApp Number Input */}
            <div
              style={{
                ...styles.languageSwitcher,
                flex: !isMobile ? "" : "1 1 300px",
              }}
            >
              <label htmlFor="language" style={styles.languageLabel}>
                📞 WhatsApp Number:
              </label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                style={styles.phoneInput}
                placeholder="Enter WhatsApp Number"
              />
            </div>
            {/* Language Switcher */}
            <div
              style={{
                ...styles.languageSwitcher,
                flex: !isMobile ? "" : "1 1 300px",
              }}
            >
              <label htmlFor="language" style={styles.languageLabel}>
                🌐 Language:
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={styles.languageSelect}
              >
                <option value="en">English</option>
                <option value="gu">ગુજરાતી</option>
              </select>
            </div>
          </div>
          {/* Preview Section */}
          <div style={styles.previewSection}>
            <div ref={bannerRef} style={styles.bannerBox}>
              {/* Header */}
              <div style={styles.bannerHeader}>
                <img
                  src={basketImage}
                  alt="Basket"
                  style={styles.headerImage}
                />
                <div style={styles.title}>
                  {getVegEmoji(selectedVeg)}{" "}
                  {language === "gu" && (
                    <span>{vegNameMap[selectedVeg].ex}</span>
                  )}{" "}
                  {translations[language].heading(
                    vegNameMap[selectedVeg][language]
                  )}
                </div>
                <div style={styles.subTitle}>
                  {translations[language].location(location)}
                </div>
              </div>

              {/* Basket Image */}
              {/* <img src={basketImage} alt="Basket" style={styles.image} /> */}
              <img
                src={vegImages[selectedVeg]}
                alt={selectedVeg}
                style={styles.image}
              />

              {/* Vegetable Name */}
              <div style={styles.vegLine}>
                <b>
                  {getVegEmoji(selectedVeg)} {vegNameMap[selectedVeg][language]}
                  {language === "gu" ? "નો" : "'s"}
                </b>{" "}
                <span style={styles.stockText}>
                  {translations[language].limited}
                </span>
              </div>

              {/* Price List */}
              <div style={styles.bannerBody}>
                {isPriceShow &&
                  prices.map((p, i) => (
                    <div key={i} style={styles.priceLine}>
                      🧺 {p.quantity} - ₹{p.price}
                    </div>
                  ))}
                {/* <div style={styles.deliveryLine}>
                  {translations[language].delivered}
                </div> */}
                <div style={styles.orderLine}>
                  {translations[language].order} <br />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={whatsappIcon}
                      alt="WhatsApp"
                      style={{ width: 18, marginRight: 6 }}
                    />
                    <b>+91 {whatsappNumber}</b>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div style={styles.buttonsRow}>
              <button onClick={downloadBanner} style={styles.downloadBtn}>
                💾 Download
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    fontFamily: "sans-serif",
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  inputSection: {
    marginBottom: "20px",
    backgroundColor: "#f0f0f0",
    padding: "15px",
    borderRadius: "10px",
  },
  heading: {
    fontSize: "20px",
    marginBottom: "10px",
  },
  input: {
    width: "96%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  phoneInput: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  priceRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },
  priceSwitcher: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "10px",
  },
  inputHalf: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "100%",
  },
  addBtn: {
    backgroundColor: "#ddd",
    padding: "8px",
    marginBottom: "10px",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
  },
  generateBtn: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "10px",
    width: "100%",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  previewSection: {
    textAlign: "center",
  },
  languageSwitcher: {
    // flex: "1 1 300px", // responsive basis
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    gap: "10px",
  },
  languageLabel: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#333",
  },

  languageSelect: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    fontSize: "14px",
    cursor: "pointer",
    outline: "none",
    transition: "border-color 0.2s ease-in-out",
  },

  buttonsRow: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  whatsappBtn: {
    backgroundColor: "#25D366",
    color: "white",
    textDecoration: "none",
    padding: "12px",
    borderRadius: "6px",
    fontWeight: "bold",
    display: "block",
  },
  downloadBtn: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  bannerBox: {
    background: "linear-gradient(145deg, #e1ffc7, #fffbc2)",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
    maxWidth: "600px",
    margin: "0 auto",
  },

  bannerHeader: {
    marginBottom: "20px",
  },

  title: {
    fontSize: "24px",
    fontWeight: "800",
    fontFamily: '"Poppins", sans-serif',
    marginBottom: "5px",
    color: "#2f6218",
  },

  subTitle: {
    fontSize: "16px",
    fontStyle: "italic",
    color: "#444",
  },

  stockText: {
    fontSize: "14px",
    color: "#e63946",
    fontWeight: "600",
    marginTop: "4px",
  },

  headerImage: {
    width: "100%",
    maxWidth: "100px",
    borderRadius: "12px",
    margin: "0px auto",
    display: "block",
  },

  image: {
    width: "100%",
    maxWidth: "300px",
    borderRadius: "12px",
    margin: "20px auto",
    display: "block",
  },

  bannerBody: {
    fontSize: "16px",
    color: "#333",
    lineHeight: "1.6",
  },

  priceLine: {
    fontWeight: "500",
    marginBottom: "6px",
  },

  deliveryLine: {
    marginTop: "10px",
    color: "#ff6f00",
    fontWeight: "bold",
  },

  orderLine: {
    marginTop: "5px",
    color: "#388e3c",
    fontWeight: "bold",
  },
  customizationSection: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    marginBottom: "20px",
  },
};
