const assets = [

    {
        id: "p1",
        name: "Home",
        type: "Villa",
        description: {
          en:[
          "This grand villa is located in the very heart of Ho Chi Minh City, one of the most vibrant and dynamic cities in Southeast Asia. Situated directly opposite the Japanese Consulate General, the property enjoys an exceptionally prestigious and central location. By car, it takes less than 10 minutes to reach the iconic Independence Palace.",
          "The residence features an expansive layout with elegant French-inspired architecture, blending sophistication, timeless beauty, and refined luxury. The villa offers a graceful atmosphere with spacious interiors and classic European design elements.",
          "Surrounding the property is an outstanding lifestyle environment filled with renowned restaurants serving French, Japanese, Chinese, and authentic Vietnamese cuisine. Residents can also enjoy numerous charming coffee shops, and vibrant music venues ranging from relaxing jazz lounges to energetic contemporary nightlife destinations.",
          "This is a rare opportunity to experience luxurious living in one of the most desirable central districts of Ho Chi Minh City."
          ],
          vi:[
          "Toà biệt thự này nằm ngay trung tâm lõi của Thành phố Hồ Chí Minh — một trong những thành phố sôi động và phát triển bậc nhất Đông Nam Á. Toà nhà nằm đối diện Tổng Lãnh Sự Quán Nhật Bản, sở hữu vị trí vô cùng đắc địa và danh giá. Chỉ mất chưa đầy 10 phút lái xe để đến Dinh Độc Lập.",
          "Biệt thự có quy mô rộng lớn với kiến trúc Pháp sang trọng, quý phái và thanh lịch, mang vẻ đẹp vượt thời gian kết hợp cùng không gian sống đẳng cấp. Thiết kế tinh tế với các đường nét châu Âu cổ điển tạo nên cảm giác vừa ấm cúng vừa xa hoa.",
          "Xung quanh khu vực là hệ sinh thái tiện ích cao cấp với rất nhiều nhà hàng nổi tiếng phục vụ ẩm thực Pháp, Nhật Bản, Trung Hoa và Việt Nam truyền thống. Ngoài ra còn có nhiều quán cà phê đẹp chất lượng cao cùng các địa điểm âm nhạc đa dạng — từ không gian nhạc Jazz thư giãn đến những quán nhạc trẻ sôi động về đêm.",
          "Đây là cơ hội hiếm có để trải nghiệm phong cách sống thượng lưu ngay giữa một trong những khu vực đáng sống nhất của Thành phố Hồ Chí Minh."
          ]
        },
        city: "Ho Chi Minh",
        country: "Vietnam",
        address: "228B Dien Bien Phu Street, Xuan Hoa Ward, Ho Chi Minh City, Vietnam",

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

        youtubeVideoId: "2dLM4Mfdjuo",

        link: "project.html?id=p1",

        selected: true
    },

    {
        id: "p2",
        name: "VPBank",
        type: "Office",
        description: {
          en:[
          "This office tower is strategically located in one of the most desirable districts in Ho Chi Minh City for commerce, finance, legal services, education, healthcare, government organizations, and professional enterprises. Positioned within the central core of the city, the building offers exceptional connectivity to all four major directions — East, West, South, and North — making transportation and business operations remarkably convenient.",
          "The surrounding neighborhood is widely recognized for its vibrant urban lifestyle and outstanding amenities. The area features an extensive collection of restaurants, and coffee shops ranging from affordable local favorites to premium high-end establishments, many of which have built strong reputations over decades. Numerous venues operate nearly 24/7, creating a dynamic and highly convenient environment for both business professionals and residents.",
          "In addition, the district is supported by supermarkets, traditional markets, convenience stores, and essential services operating around the clock, ensuring that every daily need can be easily fulfilled at any time.",
          "The area remains lively and energetic throughout the day and night, attracting a diverse mix of local residents, students, professionals, entrepreneurs, and visitors. This constant movement creates a unique atmosphere filled with ambition, productivity, creativity, learning, entertainment, and a strong spirit of contribution to society.",
          "The local community is known for being civilized, respectful, united, and culturally diverse, forming a modern urban environment where different lifestyles and cultures coexist harmoniously."
          ],
          vi:[
          "Toà cao ốc văn phòng này toạ lạc tại một trong những vị trí đẹp và đắc địa nhất của Thành phố Hồ Chí Minh dành cho thương mại, tài chính, luật, giáo dục, y tế, các tổ chức chính phủ và các doanh nghiệp chuyên nghiệp. Nằm ngay trung tâm lõi của thành phố, toà nhà sở hữu khả năng kết nối giao thông cực kỳ thuận tiện đến cả bốn hướng Đông, Tây, Nam, Bắc, giúp việc di chuyển và vận hành kinh doanh trở nên dễ dàng và hiệu quả.",
          "Khu vực xung quanh nổi tiếng với nhịp sống đô thị sôi động cùng hệ thống tiện ích phong phú. Nơi đây tập trung rất nhiều nhà hàng, quán ăn, và tiệm café từ bình dân đến cao cấp với chất lượng rất tốt, trong đó có nhiều địa điểm nổi tiếng lâu đời đã trở thành biểu tượng quen thuộc của thành phố. Nhiều cửa hàng và dịch vụ hoạt động gần như 24/7, tạo nên môi trường sống và làm việc vô cùng thuận tiện.",
          "Ngoài ra, khu vực còn có nhiều siêu thị, chợ truyền thống, cửa hàng tiện lợi và các dịch vụ thiết yếu mở cửa xuyên suốt để đáp ứng đầy đủ mọi nhu cầu sinh hoạt hằng ngày của mọi người tại đây.",
          "Không khí nơi đây lúc nào cũng đông đúc, nhộn nhịp và đầy năng lượng với sự hiện diện của cả cư dân địa phương lẫn khách vãng lai. Điều đó tạo nên một môi trường luôn sôi nổi, tràn đầy tinh thần làm việc, học tập, sáng tạo, vui chơi và cống hiến cho xã hội.",
          "Cộng đồng tại khu vực này được biết đến với sự đoàn kết, văn minh, lịch sự và đa dạng văn hoá, tạo nên một môi trường đô thị hiện đại nơi nhiều phong cách sống và nền văn hoá cùng tồn tại hài hoà."
          ],
        },  
        city: "Ho Chi Minh",
        country: "Vietnam",
        address: "102 Cao Thang Street, Ban Co Ward, Ho Chi Minh City, Vietnam",

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

        youtubeVideoId: "XWTFvqwzPUU",

        link: "project.html?id=p2",

        selected: true
    },

    {
        id: "p3",
        name: "Thien Hoang Hotel",
        type: "Hotel",
        description: {
          en:[
          "This hotel is located in one of the most desirable areas of Vung Tau, right in the famous Back Beach (Bãi Sau) district — a destination beloved by both local and international travelers. From the hotel, guests only need about a 5-minute walk to reach the beach, where they can enjoy the breathtaking coastline, beautiful sunrise views in the early morning, and romantic sunsets in the evening.",
          "From here, guests can continue walking approximately 10 more minutes along the scenic Back Beach Park promenade to reach Tháp Tam Thắng, one of the city’s most iconic and impressive landmarks. This destination has become a favorite check-in and photography spot for visitors traveling to Vung Tau.",
          "Continuing further along the coastline allows visitors to explore even more of the newly renovated Back Beach Park. The entire park area has recently been beautifully redesigned with clean public spaces, lush greenery, shaded walking paths, and numerous convenient service stations offering quick meals, refreshments, public restrooms, and freshwater shower facilities for beachgoers after swimming.",
          "In addition, guests can walk less than 10 minutes from the hotel to reach Hoàng Hoa Thám Street, widely known as one of Vung Tau’s most famous culinary streets. The area is filled with seafood restaurants serving fresh local seafood at highly reasonable prices, making it a must-visit destination for food lovers.",
          "During weekends and public holidays, the surrounding neighborhood welcomes an enormous number of tourists, creating an energetic and vibrant coastal atmosphere. Hotel room shortages during peak seasons have become increasingly common and are expected to continue in the future as Vung Tau grows in popularity among both domestic travelers and international visitors.",
          "The hotel itself is designed in a Mediterranean-inspired architectural style, creating a relaxing seaside ambiance filled with the spirit of sun, wind, ocean breezes, and the subtle sense of adventure associated with journeys out to sea. The atmosphere offers guests both comfort and the emotional feeling of a true coastal getaway."
          ],
          vi:[
          "Khách sạn này nằm tại một trong những vị trí đẹp nhất ở Vũng Tàu, ngay khu vực Bãi Sau — nơi được xem là trung tâm du lịch biển sôi động và nổi tiếng nhất của thành phố. Từ khách sạn, du khách chỉ cần đi bộ khoảng 5 phút là đã có thể ra đến biển để tận hưởng bờ biển dài tuyệt đẹp, ngắm bình minh vào buổi sáng sớm và chiêm ngưỡng hoàng hôn đầy lãng mạn vào chiều tối.",
          "Từ đây, chỉ cần đi bộ thêm khoảng 10 phút dọc theo công viên Bãi Sau là đã đến Tháp Tam Thắng — một trong những biểu tượng rất đẹp và hoành tráng của Vũng Tàu, nơi được rất nhiều du khách lựa chọn để chụp hình check-in khi đến thành phố biển này.",
          "Nếu tiếp tục di chuyển dọc theo công viên ven biển, du khách sẽ khám phá thêm toàn bộ khu công viên Bãi Sau vừa được xây dựng và cải tạo lại rất hiện đại, sạch đẹp và nhiều cây xanh bóng mát. Dọc công viên còn có nhiều khu tiện ích phục vụ đồ ăn nhanh, nước uống, nhà vệ sinh công cộng và khu tắm nước ngọt giúp người dân và du khách thuận tiện hơn sau khi tắm biển.",
          "Ngoài ra, từ khách sạn cũng chỉ mất chưa đầy 10 phút đi bộ để đến đường Hoàng Hoa Thám — một trong những con đường được xem là “Phố Ẩm Thực” nổi tiếng của Vũng Tàu. Nơi đây tập trung hàng loạt nhà hàng hải sản tươi ngon với mức giá hợp lý, thu hút rất đông du khách đến thưởng thức mỗi ngày.",
          "Vào các dịp cuối tuần và ngày lễ, khu vực xung quanh khách sạn luôn đón lượng khách du lịch cực kỳ đông đúc, tạo nên bầu không khí sôi động đặc trưng của thành phố biển. Tình trạng “cháy phòng” được dự báo sẽ còn tiếp tục trong tương lai khi ngày càng nhiều người yêu thích Vũng Tàu và ngày càng có nhiều khách du lịch quốc tế biết đến thành phố này.",
          "Khách sạn được thiết kế theo phong cách kiến trúc Địa Trung Hải, mang lại cảm giác gần gũi với biển cả, gợi lên không khí nghỉ dưỡng của nắng, gió và đại dương, đồng thời tạo nên một chút cảm giác phiêu lưu của những chuyến hải trình ra khơi. Đây là không gian lý tưởng dành cho những ai muốn tận hưởng trọn vẹn tinh thần nghỉ dưỡng ven biển."
          ]
        },
        city: "Ho Chi Minh",
        country: "Vietnam",
        address: "19/5 Ho Quy Ly, Vung Tau Ward, Ho Chi Minh City, Vietnam",

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

        selected: true
    },

    {
        id: "p4",
        name: "Tudor",
        type: "Apartment",
        description: {
          en:[
          "This apartment is uniquely positioned between Westminster and City of London — two of the most influential and iconic districts in the world. On one side lies the historic administrative and political heart of the United Kingdom, home to globally recognized landmarks such as Big Ben and the Palace of Westminster. On the other side stands the powerful financial center of London, where global financial institutions, international law firms, multinational trading corporations, world-renowned media organizations, investment funds, and leading technology companies are concentrated together.",
          "The surrounding area is filled with dense urban energy, impressive skyscrapers, and remarkable contemporary architecture that immediately conveys the image of a city defined by ambition, innovation, wealth, and global influence. Some of the world-famous skyscrapers in the City of London include “The Gherkin,” “The Cheesegrater,” “The Walkie Talkie,” 22 Bishopsgate, The Scalpel, Lloyd’s Building, and many other iconic structures that shape London’s distinctive skyline. Yet alongside these modern towers stand elegant historic buildings and traditional British residences. Rather than conflicting with one another, the old and new architecture blend together harmoniously, creating a refined balance between heritage and progress. The result is a uniquely London atmosphere — simultaneously modern and traditional, deeply cultural yet constantly evolving and forward-looking.",
          "The apartment itself is located within a Grade II listed building, meaning the property is officially recognized and protected for its historical and architectural significance by the United Kingdom. This designation highlights the importance of the building not only to British heritage, but in many ways to the broader story of global civilization and history. It is part of an area that has played a meaningful role in shaping modern finance, politics, culture, and international influence.",
          "Residents benefit from private security services and a dedicated parking garage, offering both convenience and exclusivity in the center of London.",
          "From the apartment, a scenic 30-minute walk westward along the River Thames leads to Big Ben and the Palace of Westminster. Walking eastward for approximately the same distance brings you to London Bridge. One of the most special aspects of this location is that both journeys can be enjoyed by walking along the Thames River, surrounded by famous landmarks, riverside attractions, beautiful city views, and boats moving gracefully across the water.",
          "The area remains lively throughout the entire year with tourists from around the world, while professionals dressed in elegant business attire fill the streets discussing finance, law, technology, media, and global commerce. Altogether, the atmosphere creates a lifestyle that is energetic and highly professional, yet also relaxed, sophisticated, and unmistakably British in character."
          ]
          ,
          vi:[
          "Căn hộ này nằm ở vị trí vô cùng đặc biệt giữa Westminster và City of London — hai khu vực có tầm ảnh hưởng và mang tính biểu tượng hàng đầu thế giới. Một bên là trung tâm hành chính và chính trị của Vương Quốc Anh với những công trình nổi tiếng toàn cầu như Big Ben và Palace of Westminster. Bên còn lại là trung tâm tài chính London — nơi tập trung rất nhiều tổ chức tài chính quốc tế, công ty luật toàn cầu, tập đoàn thương mại đa quốc gia, cơ quan báo chí quốc tế, quỹ đầu tư lớn và các công ty công nghệ hàng đầu thế giới.",
          "Khu vực xung quanh mang đậm nhịp sống đô thị hiện đại với mật độ dân cư đông đúc, những toà cao ốc chọc trời cùng kiến trúc độc đáo và đầy ấn tượng. Chỉ cần nhìn vào nơi đây, người ta có thể cảm nhận ngay một thành phố vô cùng năng động, giàu có, sáng tạo và luôn vươn lên mạnh mẽ. Những tòa nhà chọc trời nổi tiếng thế giới tại khu City of London bao gồm: “The Gherkin”, “The Cheesegrater”, “The Walkie Talkie”, 22 Bishopsgate, The Scalpel, Lloyd’s Building, cùng nhiều công trình biểu tượng khác góp phần tạo nên đường chân trời đặc trưng của London. Tuy nhiên, bên cạnh những công trình hiện đại ấy vẫn tồn tại những ngôi nhà cổ kính mang đậm dấu ấn lịch sử của nước Anh. Điều đặc biệt là chúng không hề phá vỡ kiến trúc của nhau mà ngược lại còn hòa quyện rất tinh tế để tôn vinh vẻ đẹp riêng của từng thời kỳ. Điều đó tạo nên cảm giác vừa hiện đại vừa truyền thống, vừa mang đậm bản sắc văn hoá vừa truyền cảm hứng về tinh thần đổi mới sáng tạo để phát triển thịnh vượng nhưng vẫn không quên những giá trị cốt lõi đã tạo nên thành tựu hôm nay.",
          "Căn hộ nằm trong một Grade II listed building — tức là công trình có giá trị lịch sử và kiến trúc quan trọng được Chính phủ Anh bảo tồn và bảo vệ. Điều này cho thấy tầm quan trọng đặc biệt của toà nhà không chỉ đối với Vương Quốc Anh mà đôi khi còn đối với lịch sử và nền văn minh của nhân loại. Đây là khu vực mang tính biểu tượng rất lớn đối với lịch sử phát triển của tài chính, chính trị, văn hoá và ảnh hưởng toàn cầu.",
          "Căn hộ có dịch vụ bảo vệ riêng cùng garage đậu xe riêng, mang đến sự an toàn, tiện nghi và đẳng cấp ngay giữa trung tâm London.",
          "Từ đây, nếu đi bộ khoảng 30 phút về phía Tây dọc theo sông Thames, ta sẽ đến Big Ben và Palace of Westminster. Ngược lại, nếu đi bộ khoảng 30 phút về phía Đông, ta sẽ đến London Bridge. Điều thú vị là ở cả hai hướng, ta đều có thể đi dọc theo bờ sông Thames để vừa ngắm nhìn thành phố với rất nhiều địa điểm du lịch nổi tiếng ven sông, vừa tận hưởng khung cảnh những con thuyền di chuyển trên mặt nước.",
          "Khu vực lúc nào cũng nhộn nhịp với lượng lớn khách du lịch quốc tế, xen lẫn hình ảnh những người đàn ông và phụ nữ trong trang phục thanh lịch đang trao đổi công việc về tài chính, luật, công nghệ, truyền thông và thương mại toàn cầu. Tất cả tạo nên một phong cách sống vừa năng động, chuyên nghiệp và đầy tham vọng, nhưng đồng thời cũng rất thư thái, quý phái và mang đậm chất riêng đặc trưng của nước Anh."
          ]
        },
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
        description: {
          en:[
          "This apartment enjoys exceptionally convenient transportation connections to many of London’s most prestigious destinations. Located near Westfield shopping mall in Shepherd’s Bush — one of the largest shopping malls in the United Kingdom — residents have access to a world-class retail and entertainment experience featuring numerous international fashion brands, restaurants, coffee shops, and a modern cinema complex.",
          "The property is also within convenient reach of some of London’s most exclusive and affluent districts, including Mayfair and High Street Kensington. These neighborhoods are internationally recognized for attracting some of the wealthiest individuals in the world and offering premium luxury services tailored to an elite lifestyle. The area is surrounded by iconic luxury shopping destinations, fine tailoring houses, prestigious jewelry boutiques, and renowned luxury department stores such as Harrods.",
          "In addition, the apartment provides excellent accessibility to many of London’s most historic and cultural landmarks, including Buckingham Palace and several globally respected museums such as the Victoria and Albert Museum, Natural History Museum, and Science Museum.",
          "The surrounding area also offers an outstanding culinary scene with many acclaimed fine dining and Michelin-starred restaurants. Residents can further enjoy the elegance and tranquility of Hyde Park, one of the most famous royal parks in the world, as well as the cultural atmosphere surrounding Royal Albert Hall, which regularly hosts prestigious concerts and international performances.",
          "Together, these elements create a lifestyle that blends luxury, culture, entertainment, convenience, and timeless British sophistication in one of the world’s most influential cities."
          ],
          vi:[
          "Căn hộ này sở hữu hệ thống giao thông rất thuận tiện để kết nối đến nhiều khu vực nổi tiếng và đẳng cấp bậc nhất của London. Từ đây có thể dễ dàng di chuyển đến trung tâm mua sắm Westfield tại Shepherd’s Bush — một trong những trung tâm mua sắm lớn nhất của Vương Quốc Anh với rất nhiều thương hiệu thời trang quốc tế, nhà hàng, quán café và cả cụm rạp chiếu phim hiện đại.",
          "Căn hộ cũng nằm gần những khu vực giàu có và danh giá hàng đầu thế giới như Mayfair và High Street Kensington — nơi tập trung nhiều tầng lớp thượng lưu giàu có quốc tế cùng hệ thống dịch vụ cao cấp phục vụ cho giới siêu giàu. Xung quanh khu vực là hàng loạt cửa hàng thời trang xa xỉ, boutique cao cấp, cửa hàng trang sức, đồng hồ sang trọng và những trung tâm mua sắm biểu tượng như Harrods.",
          "Ngoài ra, căn hộ còn có khả năng kết nối thuận tiện đến nhiều công trình văn hoá và lịch sử nổi tiếng của London như Buckingham Palace cùng các bảo tàng hàng đầu thế giới như Victoria and Albert Museum, Natural History Museum và Science Museum.",
          "Khu vực xung quanh cũng nổi tiếng với rất nhiều nhà hàng fine dining và Michelin-starred restaurants đẳng cấp quốc tế. Cư dân tại đây còn có thể tận hưởng không gian xanh thanh lịch của Hyde Park — một trong những công viên hoàng gia nổi tiếng nhất thế giới — cũng như không khí nghệ thuật và âm nhạc đặc trưng quanh Royal Albert Hall, nơi thường xuyên tổ chức các buổi hoà nhạc và biểu diễn quốc tế danh tiếng.",
          "Tất cả tạo nên một phong cách sống kết hợp hài hoà giữa sự sang trọng, văn hoá, giải trí, tiện nghi và nét quý phái đặc trưng của London — một trong những thành phố có tầm ảnh hưởng lớn nhất thế giới."
          ],
        },
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
    },

    {
        id: "p6",
        name: "Da Lat Hotel",
        type: "Hotel",
        description: {
          en:[
          "This hotel features beautiful French-inspired architecture combined with elegant Indochine-style interiors, creating an atmosphere that feels warm, relaxing, sophisticated, and deeply connected to nature. The harmonious blend of classic European aesthetics and traditional Southeast Asian influences gives the property a timeless charm while offering guests a peaceful and comfortable retreat in the heart of Da Lat.",
          "The hotel is strategically located along a major road, making transportation, guest drop-off, and vehicle access exceptionally convenient. This is considered a significant advantage, especially highly appreciated by large tour bus drivers and travel operators due to the ease of navigation and parking access. In addition, the property includes a spacious garage capable of accommodating a large number of cars and motorbikes, allowing guests traveling with private vehicles to park securely overnight.",
          "From the hotel, it takes only around 10 minutes by car to reach Da Lat Market, approximately 6 minutes to Da Lat Flower Gardens, and about 4 minutes to the famous Valley of Love.",
          "One of the hotel’s most remarkable highlights is the breathtaking rear-facing valley view. From the balconies, guests can overlook a beautiful valley below and experience the changing scenery throughout the day — from peaceful sunrise moments and romantic sunsets to mystical fog drifting across the hills. At night, the glowing lights from the greenhouse farms cultivating vegetables and flowers create a magical landscape unique to Da Lat.",
          "Da Lat is well known for its cool climate year-round, lush greenery, colorful flowers, fresh mountain air, and excellent local cuisine. These qualities have made the city one of Vietnam’s top tourist destinations for many years. With the growing popularity of nature-focused travel and wellness tourism, Da Lat is expected to attract even more domestic and international visitors in the future."
          ],
          vi:[
          "Khách sạn này sở hữu kiến trúc Pháp tuyệt đẹp kết hợp cùng nội thất phong cách Indochine sang trọng, tạo nên cảm giác vừa thư giãn, thoải mái vừa hài hoà với thiên nhiên. Sự kết hợp tinh tế giữa nét cổ điển châu Âu và văn hoá Đông Dương mang đến một không gian nghỉ dưỡng đầy ấm áp, thanh lịch và vượt thời gian ngay giữa lòng Đà Lạt.",
          "Khách sạn nằm trên một tuyến đường lớn giúp việc di chuyển đến khách sạn, đón trả khách và đỗ xe trở nên đặc biệt thuận tiện. Đây là một lợi thế rất lớn và được nhiều tài xế xe khách du lịch đánh giá rất cao nhờ khả năng tiếp cận dễ dàng. Ngoài ra, khách sạn còn sở hữu garage rộng lớn có thể chứa được nhiều ôtô và xe máy, giúp khách đi xe riêng có thể yên tâm gửi xe qua đêm.",
          "Từ khách sạn, chỉ mất khoảng 10 phút lái xe để đến Da Lat Market, khoảng 6 phút để đến Da Lat Flower Gardens và chỉ khoảng 4 phút để đến Valley of Love nổi tiếng.",
          "Một trong những điểm đặc biệt nhất của khách sạn chính là view thung lũng tuyệt đẹp phía sau toà nhà. Từ các ban công, du khách có thể phóng tầm mắt xuống thung lũng bên dưới để chiêm ngưỡng nhiều khoảnh khắc rất đặc trưng của Đà Lạt — từ bình minh nhẹ nhàng, hoàng hôn lãng mạn đến những làn sương mù bao phủ khắp đồi núi. Vào ban đêm, ánh đèn rực sáng từ các nhà kính trồng rau và hoa dưới thung lũng tạo nên một khung cảnh vô cùng thơ mộng và đặc biệt.",
          "Đà Lạt từ lâu nổi tiếng với khí hậu mát mẻ quanh năm, cây cối xanh tươi, hoa lá rực rỡ, không khí trong lành và nền ẩm thực hấp dẫn. Chính những điều đó đã giúp Đà Lạt luôn trở thành một trong những điểm du lịch thu hút đông đảo du khách hàng đầu của Việt Nam. Trong tương lai, thành phố này được kỳ vọng sẽ tiếp tục thu hút ngày càng nhiều khách du lịch trong và ngoài nước."
          ],
        },
        city: "Lam Dong",
        country: "Vietnam",
        address: "180 Phu Dong Thien Vuong Street, Lam Dong City, Vietnam",

        lat: 11.966571350390282, 
        lng: 108.44381522870809,

        images: [
            "./project6/1.jpg",
            "./project6/2.jpg",
            "./project6/3.jpg",
            "./project6/4.jpg",
            "./project6/5.jpg",
            "./project6/6.jpg",
            "./project6/7.jpg",
            "./project6/8.jpg",
            "./project6/9.jpg",
            "./project6/10.jpg",
            "./project6/11.jpg",
            "./project6/12.jpg",
            "./project6/13.jpg",
            "./project6/14.jpg",
            "./project6/15.jpg",
            "./project6/16.jpg",
            "./project6/17.jpg",
            "./project6/18.jpg",
            "./project6/19.jpg",
            "./project6/20.jpg",
            "./project6/21.jpg",
            "./project6/22.jpg",
            "./project6/23.jpg",
            "./project6/24.jpg",
            "./project6/25.jpg",
            "./project6/26.jpg",
            "./project6/27.jpg",
            "./project6/28.jpg",
            "./project6/29.jpg",
            "./project6/30.jpg",
            "./project6/31.jpg",
            "./project6/32.jpg"  
        ],

        isForRent: true,
        rent: 250,
        rentUnit: "triệu/tháng",

        price: 150,
        priceUnit: "tỷ",

        status: "occupied",

        link: "project.html?id=p6",

        selected: true
    }

];

window.assets = assets;

window.socialSources = {
  "Ho Chi Minh City": {
    food: [
      {
        name: "Khoai Lang Thang",
        platform: "YouTube",
        url: "https://www.youtube.com/@KhoaiLangThang",
        places: [
            "Bánh Mì Huỳnh Hoa",
            "Phở Hòa Pasteur",
            "Cơm Tấm Ba Ghiền",
            "Ốc Đào"
        ]
     },
     {
        name: "Ninh Tito",
        platform: "YouTube",
        url: "https://www.youtube.com/@NinhTito",
        places: [
            "Pizza 4P’s",
            "The Deck Saigon",
            "Hum Vegetarian"
        ]
      },
      {
        name: "Chan La Cà",
        platform: "YouTube",
        url: "https://www.youtube.com/@ChanLaCa",
        places: [
            "Bún chả 145",
            "Ốc Đào",
            "Haidilao"
        ]
      },
      {
        name: "Saigon Foodie",
        platform: "Instagram",
        url: "https://instagram.com/saigonfoodie",
        places: [
          "Secret Garden Restaurant",
          "Propaganda Vietnamese Bistro",
          "The Deck Saigon",
          "Pizza 4P’s",
          "Hum Vegetarian"
        ]
      },
      {
        name: "Review Ăn Ngon",
        platform: "TikTok",
        url: "https://tiktok.com/@reviewanngon",
        places: [
          "Bún Chả 145 Bùi Viện",
          "Ốc Đào",
          "Bánh Mì Huỳnh Hoa",
          "Cơm Tấm Ba Ghiền",
          "Phở Hòa Pasteur"
        ]
      },
      {
        name: "The Racha Room Review",
        platform: "TikTok",
        url: "https://tiktok.com/@racharoom",
        places: [
          "The Racha Room",
          "Anan Saigon",
          "Quince Saigon"
        ]
      }
    ],

    drink: [
      {
        name: "Saigon Coffee Explorer",
        platform: "Instagram",
        url: "https://instagram.com/saigoncoffeeexplorer",
        places: [
          "Soo Cafe",
          "The Workshop Coffee",
          "Bosgaurus Coffee",
          "Every Half Coffee"
        ]
      }
    ],

    music: [
      {
        name: "Saigon Vibes",
        platform: "Instagram",
        url: "https://instagram.com/saigonvibes",
        places: [
          "Acoustic Bar",
          "Yoko Cafe",
          "Chill Skybar"
        ]
      }
    ],

    sports: [
      {
        name: "Pickleball Saigon",
        platform: "Facebook",
        url: "https://facebook.com/pickleball.saigon",
        places: [
          "Saigon Pickleball Court",
          "RMIT Sports Complex"
        ]
      }
    ]
  },

  "London": {
    food: [
      {
        name: "TopJaw",
        platform: "YouTube",
        url: "https://www.youtube.com/@TopJaw",
        places: [
            "Dishoom",
            "Padella",
            "Flat Iron"
       ]
      },
      {
        name: "London Eats",
        platform: "Instagram",
        url: "https://instagram.com/londoneats",
        places: [
          "Dishoom",
          "Flat Iron",
          "Sketch London",
          "Padella"
        ]
      }
    ],
    drink: [
      {
        name: "London Coffee Guide",
        platform: "Instagram",
        url: "https://instagram.com/londoncoffee",
        places: [
          "Monmouth Coffee",
          "Kaffeine",
          "Ozone Coffee"
        ]
      }
    ],
    music: [
      {
        name: "London Nightlife",
        platform: "TikTok",
        url: "https://tiktok.com/@londonnightlife",
        places: [
          "Fabric London",
          "Ministry of Sound"
        ]
      }
    ],
    sports: []
  },

  "Lam Dong": {
    food: [
      {
        name: "Khoai Lang Thang",
        platform: "YouTube",
        url: "https://www.youtube.com/@KhoaiLangThang",
        places: [
            "Túi Mơ To",
            "Still Cafe",
            "Là Việt Coffee"
        ]
      },
      {
        name: "Ăn Sập Đà Lạt",
        platform: "TikTok",
        url: "https://www.tiktok.com/@ansapdalat",
        places: [
          "Túi Mơ To",
          "Là Việt Coffee",
          "Still Cafe",
          "Windmills Coffee"
        ]
      },
      {
        name: "Da Lat Food Review",
        platform: "Instagram",
        url: "https://www.instagram.com/dalatfoodreview",
        places: [
          "Tiệm Bánh Cối Xay Gió",
          "Bánh Mì Xíu Mại Hoàng Diệu",
          "Chợ Đà Lạt"
        ]
      },
      {
        name: "Da Lat Eating",
        platform: "Facebook",
        url: "https://www.facebook.com/dalateating",
        places: [
          "Nem Nướng Bà Hùng",
          "Lẩu Gà Lá É Tao Ngộ"
        ]
      }
    ],

    drink: [
      {
        name: "Da Lat Coffee Holic",
        platform: "Instagram",
        url: "https://www.instagram.com/dalatcoffeeholic",
        places: [
          "Horizon Coffee",
          "Cheo Veooo",
          "Mê Linh Coffee Garden"
        ]
      }
    ],

    music: [
      {
        name: "Da Lat Acoustic",
        platform: "Facebook",
        url: "https://www.facebook.com/dalatacoustic",
        places: [
          "Lululola Coffee",
          "The Seen House"
        ]
      }
    ],

    sports: [
      {
        name: "Da Lat Pickleball Club",
        platform: "Facebook",
        url: "https://www.facebook.com/dalatpickleball",
        places: [
          "Da Lat Sports Center"
        ]
      }
    ]
  }
};