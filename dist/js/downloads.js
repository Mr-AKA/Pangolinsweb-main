const getFormRTO = document.querySelector(".get-form-rto");
const getCharterRTO = document.querySelector(".get-charter-rto");

getFormRTO.onclick = () => {
    const link = document.createElement("a");
    link.setAttribute(
        "href",
        "../../assets/data/pdf/Rent to Own - Application Form.pdf"
    );
    link.download = "Rent to Own - Application Form.pdf";
    link.href = "../../assets/data/pdf/Rent to Own - Application Form.pdf";
    link.click();
};

getCharterRTO.onclick = () => {
    const link = document.createElement("a");
    link.setAttribute(
        "href",
        "../../assets/data/pdf/Rent to Own - Service Charter.pdf"
    );
    link.download = "Rent to Own - Service Charter.pdf";
    link.href = "../../assets/data/pdf/Rent to Own - Service Charter.pdf";
    link.click();
};
