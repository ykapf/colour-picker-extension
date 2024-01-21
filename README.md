# Colour Picker Extension

## Description
This Colour Picker Extension is a versatile and user-friendly tool designed for users who need a quick and easy way to select, modify, and utilise colors within their projects. Built using React, this extension offers a range of features including a standard color wheel, RGB and HEX input fields, and an eye-dropper tool for extracting colors from web pages.

## Technical Description
Uses custom webpack function and plugin combinations to write react code to static format (which is needed for chrome extension deployment)
Utilises react-color and color-convert for colour computation. 
The custom eye dropper is made with the eyedropper api - which is certainly incompatible on most browsers. (Only recommended to be stable on chrome)

## Features
- **Color Wheel**: Choose colors using a user-friendly color wheel interface.
- **RGB & HEX Fields**: Input and copy colors in RGB or HEX format.
- **Eye-Dropper Tool**: Pick colors directly from web pages.
- **Responsive Design**: Works well on different screen sizes and device types.
- **Clipboard Support**: Easily copy color values to your clipboard.

## Installation
To install and run this extension locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/ykapf/colour-picker-extension.git
    ```
2. Navigate to the project directory:
    ```bash
    cd colour-picker-extension
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Run the project:
    ```bash
    npm start
    ```

## Usage
After installation, the colour picker can be accessed through the browser's developer extension toolbar. Clicking the extension icon will open a popup where you can:

- Use the color wheel to select a color.
- Use the RGB and HEX input fields to modify or input color values.
- Use the eye-dropper tool to pick colors from web content.
- Click on any input field to copy its content to the clipboard.

## Contributing
Contributions to improve the Colour Picker Extension are welcome. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
5. Push to the branch (`git push origin feature/AmazingFeature`).
6. Open a pull request.

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Support
If you like this project, please consider [buying me a coffee](https://www.buymeacoffee.com/ykapf).

---
