const assets = [

    {
        id: "p1",
        name: "Home",
        type: "Villa",
        description: "Some descriptions",
        city: "Hochiminh",
        country: "Vietnam",
        address: "228B Dien Bien Phu Street, Xuan Hoa Ward, Hochiminh City, Vietnam",

        lat: 10.781890757003193, 
        lng: 106.68861278232475,

        images: [
            "./project1/1.jpg",
            "./project1/2.jpg",
            "./project1/3.jpg",
            "./project1/4.jpg",
            "./project1/5.jpg",
            "./project1/6.jpg",
            "./project1/7.jpg",
            "./project1/8.jpg",
            "./project1/9.jpg",
            "./project1/10.jpg",
            "./project1/11.jpg",
            "./project1/12.jpg",
            "./project1/13.jpg",
            "./project1/14.jpg",
            "./project1/15.jpg",
            "./project1/16.jpg",
            "./project1/17.jpg",
            "./project1/18.jpg",
            "./project1/19.jpg",
            "./project1/20.jpg"   
        ],

        isForRent: false,
        rent: null, 
        rentUnit: null,

        price: 1000, 
        priceUnit: "tỷ",

        status: "occupied",

        link: "project.html?id=p1",

        selected: true
    },

    {
        id: "p2",
        name: "VPBank",
        type: "Office",
        description: "Some descriptions",
        city: "Hochiminh",
        country: "Vietnam",
        address: "102 Cao Thang Street, Ban Co Ward, Hochiminh City, Vietnam",

        lat: 10.772116044883491, 
        lng: 106.68029573722461,

        images: [
            "./project2/1.jpg",
            "./project2/2.jpg",
            "./project2/3.jpg",
            "./project2/4.jpg",
            "./project2/5.jpg",
            "./project2/6.jpg",
            "./project2/7.jpg",
            "./project2/8.jpg",
            "./project2/9.jpg",
            "./project2/10.jpg",
            "./project2/11.jpg",
            "./project2/12.jpg",
            "./project2/13.jpg",
            "./project2/14.jpg",
            "./project2/15.jpg",
            "./project2/16.jpg",
            "./project2/17.jpg",
            "./project2/18.jpg",
            "./project2/19.jpg",
            "./project2/20.jpg",
            "./project2/21.jpg",
            "./project2/22.jpg",
            "./project2/23.jpg",
            "./project2/24.jpg",
            "./project2/25.jpg",
            "./project2/26.jpg",
            "./project2/27.jpg",
            "./project2/28.jpg",
            "./project2/29.jpg",
            "./project2/30.jpg",
            "./project2/31.jpg",
            "./project2/32.jpg",
            "./project2/33.jpg",
            "./project2/34.jpg",
            "./project2/35.jpg",
            "./project2/36.jpg",
            "./project2/37.jpg",
            "./project2/38.jpg",
            "./project2/39.jpg",
            "./project2/40.jpg",
            "./project2/41.jpg",
            "./project2/42.jpg",
            "./project2/43.jpg",
            "./project2/44.jpg",
            "./project2/45.jpg",
            "./project2/46.jpg",
            "./project2/47.jpg",
            "./project2/48.jpg",
            "./project2/49.jpg",
            "./project2/50.jpg",
            "./project2/51.jpg",
            "./project2/52.jpg",
            "./project2/53.jpg",
            "./project2/54.jpg",
            "./project2/55.jpg",
            "./project2/56.jpg",
            "./project2/57.jpg",
            "./project2/58.jpg",
            "./project2/59.jpg",
            "./project2/60.jpg",
            "./project2/61.jpg",
            "./project2/62.jpg",
            "./project2/63.jpg",
            "./project2/64.jpg"
        ],

        isForRent: true,
        rent: 300,
        rentUnit: "triệu/tháng",

        price: 300,
        priceUnit: "tỷ",

        status: "occupied",

        link: "project.html?id=p2",

        selected: true
    },

    {
        id: "p3",
        name: "Thien Hoang Hotel",
        type: "Hotel",
        description: "Some descriptions",
        city: "Hochiminh",
        country: "Vietnam",
        address: "19/5 Ho Quy Ly, Vung Tau Ward, Hochiminh City, Vietnam",

        lat: 10.339172643391048, 
        lng: 107.09027562606835,

        images: [
            "./project3/1.jpg",
            "./project3/2.jpg",
            "./project3/3.jpg",
            "./project3/4.jpg",
            "./project3/5.jpg",
            "./project3/6.jpg",
            "./project3/7.jpg",
            "./project3/8.jpg",
            "./project3/9.jpg",
            "./project3/10.jpg",
            "./project3/11.jpg",
            "./project3/12.jpg"
        ],

        isForRent: true,
        rent: 50,
        rentUnit: "triệu/tháng",

        price: 30,
        priceUnit: "tỷ",

        status: "occupied",

        link: "project.html?id=p3",

        selected: false
    },

    {
        id: "p4",
        name: "Tudor",
        type: "Apartment",
        description: "Some descriptions",
        city: "London",
        country: "United Kingdom",
        address: "Apartment 18, Victoria House, 25 Tudor Street, London, United Kingdom, EC4Y 0DD",

        lat: 51.51240144398895, 
        lng: -0.10767210063387007,

        images: [
            "./project4/1.jpg",
            "./project4/2.jpg",
            "./project4/3.jpg",
            "./project4/4.jpg",
            "./project4/5.jpg",
            "./project4/6.jpg",
            "./project4/7.jpg",
            "./project4/8.jpg",
            "./project4/9.jpg",
            "./project4/10.jpg",
            "./project4/11.jpg",
            "./project4/12.jpg",
            "./project4/13.jpg",
            "./project4/14.jpg",
            "./project4/15.jpg"
        ],

        isForRent: true,
        rent: 150,
        rentUnit: "triệu/tháng",

        price: 50,
        priceUnit: "tỷ",

        status: "occupied",

        link: "project.html?id=p4",

        selected: true
    },

    {
        id: "p5",
        name: "The Vale",
        type: "Apartment",
        description: "Some descriptions",
        city: "London",
        country: "United Kingdom",
        address: "First Floor Flat, 15 The Vale, London, United Kingdom, W3 7SH",

        lat: 51.50665082647009, 
        lng: -0.24741487712793842,

        images: [
            "./project5/1.jpg",
            "./project5/2.jpg",
            "./project5/3.jpg",
            "./project5/4.jpg",
            "./project5/5.jpg",
            "./project5/6.jpg",
            "./project5/7.jpg",
            "./project5/8.jpg",
            "./project5/9.jpg",
            "./project5/10.jpg",
            "./project5/11.jpg",
            "./project5/12.jpg",
            "./project5/13.jpg",
            "./project5/14.jpg",
            "./project5/15.jpg",
            "./project5/16.jpg",
            "./project5/17.jpg",
            "./project5/18.jpg",
            "./project5/19.jpg"
        ],

        isForRent: true,
        rent: 50,
        rentUnit: "triệu/tháng",

        price: 20,
        priceUnit: "tỷ",

        status: "occupied",

        link: "project.html?id=p5",

        selected: true
    }

];