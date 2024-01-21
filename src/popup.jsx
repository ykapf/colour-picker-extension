import React, { useState, useRef } from "react";
import { render } from "react-dom";
import { ChromePicker, SliderPicker, HuePicker } from "react-color";
import "./global.css";
import convert from "color-convert";

function Popup() {
  const [colour, setColour] = useState({ hex: "#f5f0e6", rgb: "rgb(245, 240, 230)" });
  const [message, setMessage] = useState("");
  const colorInputRef = useRef(null);

  const handleEyeDropper = async () => {
    if ("EyeDropper" in window) {
      try {
        const eyeDropper = new EyeDropper();
        const result = await eyeDropper.open();
        const hex = result.sRGBHex;
        const rgb = `rgb(${convert.hex.rgb(hex).join(", ")})`; // Convert hex to rgb
        setColour({ hex, rgb });
      } catch (error) {
        console.error(error);
        // Handle any errors or cancellations here
      }
    } else {
      console.error("EyeDropper API is not supported in this browser.");
    }
  };

  const openColorPicker = () => {
    colorInputRef.current.click();
  };

  const handleColourChange = (color) => {
    if (color.rgb) {
      // If color picker gives RGB values
      const hex = color.hex;
      const rgb = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
      setColour({ hex, rgb });
    } else if (color.hsl) {
      // If color picker gives HSL values
      const rgbArray = convert.hsl.rgb([color.hsl.h, color.hsl.s * 100, color.hsl.l * 100]);
      const hex = `#${convert.rgb.hex(rgbArray)}`;
      const rgb = `rgb(${rgbArray.join(", ")})`;
      setColour({ hex, rgb });
    }
  };

  const handleHexChange = (event) => {
    const hex = event.target.value;
    if (/^#([0-9A-F]{3}){1,2}$/i.test(hex)) {
      const rgb = `rgb(${convert.hex.rgb(hex).join(", ")})`;
      setColour({ hex, rgb });
    } else {
      setColour((prev) => ({ ...prev, hex }));
    }
  };

  const handleRgbChange = (event) => {
    const rgb = event.target.value;
    if (/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/i.test(rgb)) {
      const rgbArray = rgb.match(/\d+/g).map(Number);
      const hex = `#${convert.rgb.hex(rgbArray)}`;
      setColour({ hex, rgb });
    } else {
      setColour((prev) => ({ ...prev, rgb }));
    }
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setMessage("Copied!");
      setTimeout(() => setMessage(""), 1000); // Message disappears after 1 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="popup">
      <div id="swatch" style={{ backgroundColor: colour.hex }}></div>
      <h1 className="heading">Colour Picker</h1>

      <div className="colourInputsParent">
        <div className="colourSelectInputs">
          <button className="eye-dropper" onClick={handleEyeDropper}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="eye-dropper-icon">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15 11.25 1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 1 0-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9M15 11.25 12.75 9"
              />
            </svg>
          </button>
          <button className="custom-detailed-view" onClick={openColorPicker}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="eye-dropper-icon">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
              />
            </svg>
          </button>
        </div>
        <input ref={colorInputRef} className="detailed-view" type="color" value={colour.hex} onChange={(e) => handleHexChange(e)} />

        <div className="colourInputs">
          <input
            className="colourTextInput"
            type="text"
            value={colour.hex}
            onChange={handleHexChange}
            placeholder="HEX"
            onClick={() => handleCopy(colour.hex)}
          />
          <input
            className="colourTextInput"
            type="text"
            value={colour.rgb}
            onChange={handleRgbChange}
            placeholder="RGB"
            onClick={() => handleCopy(colour.rgb)}
          />
        </div>
        {message && <p className="toast-message">{message}</p>}
        <HuePicker color={colour.hex} onChange={(c) => handleColourChange(c)} />
      </div>

      <a href="https://www.buymeacoffee.com/ykapf" target="_blank" rel="noopener noreferrer" className="buy-me-coffee-link">
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="coffee-image">
          <title>Buy Me A Coffee</title>
          <path
            d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.2-1.756.205-.656.004-1.31-.025-1.966-.022-.699.004-1.556-.06-2.095-.58-.475-.458-.54-1.174-.605-1.793l-.731-7.013-.322-3.094c-.037-.351-.286-.695-.678-.678-.336.015-.718.3-.678.679l.228 2.185.949 9.112c.147 1.344 1.174 2.068 2.446 2.272.742.12 1.503.144 2.257.156.966.016 1.942.053 2.892-.122 1.408-.258 2.465-1.198 2.616-2.657.34-3.332.683-6.663 1.024-9.995l.215-2.087a.484.484 0 01.39-.426c.402-.078.787-.212 1.074-.518.455-.488.546-1.124.385-1.766zm-1.478.772c-.145.137-.363.201-.578.233-2.416.359-4.866.54-7.308.46-1.748-.06-3.477-.254-5.207-.498-.17-.024-.353-.055-.47-.18-.22-.236-.111-.71-.054-.995.052-.26.152-.609.463-.646.484-.057 1.046.148 1.526.22.577.088 1.156.159 1.737.212 2.48.226 5.002.19 7.472-.14.45-.06.899-.13 1.345-.21.399-.072.84-.206 1.08.206.166.281.188.657.162.974a.544.544 0 01-.169.364zm-6.159 3.9c-.862.37-1.84.788-3.109.788a5.884 5.884 0 01-1.569-.217l.877 9.004c.065.78.717 1.38 1.5 1.38 0 0 1.243.065 1.658.065.447 0 1.786-.065 1.786-.065.783 0 1.434-.6 1.499-1.38l.94-9.95a3.996 3.996 0 00-1.322-.238c-.826 0-1.491.284-2.26.613z"
            fill="white"
          ></path>
        </svg>
        Buy me a coffee
      </a>
    </div>
  );
}

render(<Popup />, document.getElementById("react-target"));
