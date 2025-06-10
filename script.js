function generateQRCode() {
  const text = document.getElementById('qr-text').value;
  const fgColor = document.getElementById('fg-color').value;
  const bgColor = document.getElementById('bg-color').value;

  // Clear previous QR
  document.getElementById('qrcode').innerHTML = '';

  const qrCode = new QRCode(document.getElementById('qrcode'), {
    text: text,
    width: 256,
    height: 256,
    colorDark: fgColor,
    colorLight: bgColor,
    correctLevel: QRCode.CorrectLevel.H
  });

  // Handle logo embedding
  const fileInput = document.getElementById('logo-input');
  const logoImg = document.getElementById('qr-logo');

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      logoImg.src = e.target.result;
      logoImg.style.display = 'block';
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    logoImg.style.display = 'none';
  }
}

function downloadQRCode() {
  const container = document.getElementById('qr-container');
  html2canvas(container).then(canvas => {
    const link = document.createElement('a');
    link.download = 'qr-code.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}
