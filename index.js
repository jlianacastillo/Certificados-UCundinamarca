const userName = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");
const { PDFDocument, rgb, degrees } = PDFLib;
const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );
submitBtn.addEventListener("click", () => {
  const val = capitalize(userName.value);
  if (val.trim() !== "" && userName.checkValidity()) {
    generatePDF(val);
  } else {
    userName.reportValidity();
  }
});
const generatePDF = async (name) => {
  const existingPdfBytes = await fetch("./CertificadoUCundinamarca.pdf").then((res) =>
    res.arrayBuffer()
  );
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);
  const fontBytes = await fetch("./Sanchez-Regular.ttf").then((res) =>
    res.arrayBuffer()
  );
  const SanChezFont = await pdfDoc.embedFont(fontBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  firstPage.drawText(name, {
    x: 220,
    y: 270,
    size: 40,
    font: SanChezFont,
  });
  const pdfBytes = await pdfDoc.save();
  console.log("Certificado Creado");
  var file = new File(
    [pdfBytes], "Certificado UCundinamarca.pdf", {
      type: "application/pdf;charset=utf-8",
    }
  );
 saveAs(file);
};