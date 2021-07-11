const RULES = [
  {
    name: "SRO",
    handler: (line, registrationDocument) => {
      const halves = line.split("Date /");
      registrationDocument.sro = halves[0]
        .trim()
        .replace("S.R.O /சா.ப.அ:", "")
        .trim();
      registrationDocument.date = halves[1].trim().replace("நாள்:", "").trim();
      return registrationDocument;
    },
    values: ["S.R.O /சா.ப.அ:"],
  },
  {
    name: "documentNo",
    handler: (line, registrationDocument) => {
      registrationDocument.documentNo = line
        .replace("Document No.& Year", "")
        .replace("/ஆவண எண் மற்றும் ஆண்டு:","")
        .trim();
      return registrationDocument;
    },
    values: ["Document No.& Year"]
  },
  {
    name: "documentNo",
    handler: (line, registrationDocument, inputArray, index) => {
      registrationDocument.dates = new DocumentDates(inputArray[index + 2], inputArray[index + 3], inputArray[index + 4])
      return registrationDocument;
    },
    values: ["பக்க எண்"],
    
  }
];

const LINES_TO_IGNORE = [
  "GOVERNMENT OF TAMILNADU",
  "REGISTRATION DEPARTMENT",
  "தமிழ்நாடு அரசு",
  "Certificate of Encumbrance on Property",
  "ெசாத்து ெதாடர்பான வில்லங்கச் சான்று",
  "பதிவுத்துைற",
  "Sr. No./",
  "வ.",
  "எண்",
  "Document No.& Year/",
  "ஆவண எண் மற்றும்",
  "ஆண்டு",
  "Date of Execution & Date",
  "of Presentation & Date of",
  "Registration/",
  "எழுதிக் ெகா டுத்த நாள் &",
  "தாக்க ல் நாள் & பதிவு",
  "நாள்",
  "Nature/தன்ைம",
  "Name of Executant(s)/",
  "எழுதிக் ெகாடுத்தவர்(கள்)",
];

const ENDING_LINE =
  "Disclaimer: The details of the above property have been provided with due care and with reference to the Acts and Rules. However in case of any error or omission, the";

module.exports = { ENDING_LINE, LINES_TO_IGNORE, RULES };
