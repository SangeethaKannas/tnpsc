class DocumentDates {
  constructor(
    executionDate = "",
    presentationData = "",
    registrationDate = ""
  ) {
    this.executionDate = executionDate;
    this.presentationData = presentationData;
    this.registrationDate = registrationDate;
  }
}

class SakkuBanthi {
  constructor(east, west, north, south) {
    this.east = east;
    this.west = west;
    this.south = south;
    this.north = north;
  }
}

class Value {
  constructor(considerationValue, marketValue) {
    this.considerationValue = considerationValue;
    this.marketValue = marketValue;
  }
}

class Registration_Document_Type {
  static SALE_DEED = "SALE_DEED";
}

class RegistrationDocument {
  constructor() {}

  documentNo = 0;
  amount = 0.0;
  date = "";
  village = null;
  surveyNumber = 0;
  subDivision = 0;
  area = 0;
  documentType = Registration_Document_Type.SALE_DEED;

  SakkuBanthi = new SakkuBanthi();
  date;
}

module.exports = RegistrationDocument;
