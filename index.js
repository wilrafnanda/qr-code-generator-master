 const downloadBtn = document.getElementById("downloadBtn");
 const inputField = document.getElementById("input");
 const dsiplayQR = document.getElementById("QR_CODE-display");
 const inputDisplay = document.getElementById("input-display");
 const alertBoxElement = document.getElementById("customAlert")
       
        
        // var qrcode = new QRCode("qrcode",{
        //         text: "https://www.geeksforgeeks.org",
        //         width: 150,
        //         height: 150,
        //         colorDark : "rgb(5, 127, 188)",
        //         colorLight : "#ffffff",
        //         correctLevel : QRCode.CorrectLevel.H
        //     });
        let inputText = inputField.value;
        console.log(inputText);


inputField.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        if (inputField.value === "") {
            alertBoxElement.style.display = "block"
            inputField.disabled = true; 
            
            return
        }
        dsiplayQR.style.display = "block";
        inputDisplay.style.display = "none";
        //geting the text from the input
                let inputText = inputField.value;        
            var qrcode = new QRCode("qrcode", {
                text: inputText,
                width: 150,
                height: 150,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
             qrcode.makeCode(inputText);


    }
})
function closeAlert(){
    alertBoxElement.style.display = "none"
    inputField.disabled = false;
}

downloadBtn.addEventListener('click', () => {
    const qrCodeImg = document.querySelector('#qrcode img'); // Select the QR code image
    if (qrCodeImg) {
        const imgSrc = qrCodeImg.getAttribute('src'); // Get the image source
        downloadBtn.setAttribute('href', imgSrc); // Set the href for the download link
        downloadBtn.setAttribute('download', 'qr_code.png'); // Set the download attribute with a filename
    } else {
        console.error('QR code image not found!');
    }
});

const shareBtn = document.getElementById("share");

shareBtn.addEventListener('click', async () => {
    const qrCodeCanvas = document.querySelector('#qrcode canvas'); // Select the QR code canvas
    if (qrCodeCanvas) {
        try {
            // Convert the canvas to a blob
            const blob = await new Promise((resolve) => qrCodeCanvas.toBlob(resolve, 'image/png'));
            // Write the blob to the clipboard
            await navigator.clipboard.write([
                new ClipboardItem({
                    'image/png': blob
                })
            ]);
            alert('QR code copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy QR code to clipboard:', error);
        }
    } else {
        console.error('QR code canvas not found!');
    }
});