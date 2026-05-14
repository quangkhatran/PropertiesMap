const vietnamKeywords = [

  "viet nam",
  "vietnam",

  "ho chi minh",
  "sai gon",
  "saigon",

  "ha noi",
  "hanoi",

  "da nang",
  "da lat",

  "dong nai",
  "nhon trach",
  "long thanh",
  "bien hoa",

  "binh duong",
  "vung tau",
  "can tho",
  "nha trang",
  "phu quoc",

  "hai phong",
  "bac ninh",
  "quang ninh",
  "thanh hoa",

  "thu duc",
  "quan 2",
  "quan 9"

];

function isVietnamLocation(city=""){

  const normalized =
    city
      .toLowerCase()
      .trim();

  return vietnamKeywords.some(
    keyword =>
      normalized.includes(keyword)
  );

}

function getVietnameseName(city=""){

  const aliases = {

    "ho chi minh city":"Sài Gòn",
    "saigon":"Sài Gòn",

    "ha noi":"Hà Nội",
    "hanoi":"Hà Nội",

    "da lat":"Đà Lạt",
    "da nang":"Đà Nẵng",

    "dong nai":"Đồng Nai",
    "nhon trach":"Nhơn Trạch",
    "long thanh":"Long Thành",
    "bien hoa":"Biên Hòa",

    "vung tau":"Vũng Tàu",
    "can tho":"Cần Thơ"

  };

  return (
    aliases[city.toLowerCase()]
    || city
  );

}

function getSubregions(city=""){

  if(!isVietnamLocation(city)){
    return [];
  }

  const normalized =
    city.toLowerCase();

  const subregions = {

    "dong nai":[
      "Nhơn Trạch",
      "Long Thành",
      "Biên Hòa",
      "Trảng Bom",
      "Dĩ An"
    ],

    "ho chi minh city":[
      "Thủ Đức",
      "Quận 2",
      "Quận 9",
      "Phú Mỹ Hưng"
    ],

    "da lat":[
      "Trại Mát",
      "Xuân Hương",
      "Tuyền Lâm"
    ]

  };

  return (
    subregions[normalized]
    || []
  );

}

module.exports = {

  isVietnamLocation,
  getVietnameseName,
  getSubregions

};