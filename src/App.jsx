import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './styles.css';

const SHOWSTOPPERS = [
  { id: "ss1", name: "Cabbage Steak with Whipped Tofu", date: "02.01.26",
    photos: ["/food-pics/showstoppers/cabbage steak with whipped tofu.JPG"],
    note: "My friend had accidentally bought an American cabbage instead of a Napa cabbage and had graciously gifted it to me. Kind of racist, but I was happy to accept. I became kind of obsessed with the potential of this cabbage and I would look at recipes every night dreaming of what to turn this into. I always wanted to try a cabbage steak so I made that dream a reality. I pan fried the cabbage in olive oil with the classic spices I put on everything (cumin, coriander, chili powder, garlic) and thought it was too plain. I blended tofu with cilantro, garlic, lemon juice, and nutritional yeast. Finally, I roasted chickpeas with the same spices that I used for the cabbage and plated it with some roasted pecans as well for additional crunch. It was pretty good, I think that the whipped tofu needed to be a little punchier to compliment the cabbage better but I'm happy I gave a new life to this cabbage.", tilt: -2.2 },
  { id: "ss2", name: "Achari Gobhi Pizza", date: "07.23.25",
    photos: ["/food-pics/showstoppers/achari gobhi pizza.JPG"],
    note: "After my sister and I learned how to make pizza dough we took the liberty of making my best friend's favorite pizza flavor. There is this Indian pizza chain restaurant in the Bay Area called Curry Pizza House and they combine Indian flavors like achari gobhi (tangy spicy cauliflower) and pizza. We recreated this for her and it was incredible. Almost as good as the real thing. My best friend is the number one eater of my creations and she doesn't ever say anything but just smiles and says mmm. She of course had no words to say but probably gave her longest mmmmmm to this.", tilt: 1.8 },
  { id: "ss3", name: "Green Dream Pizza", date: "07.23.25",
    photos: ["/food-pics/showstoppers/green dream pizza.JPG"],
    note: "Keeping up with the theme of copying Curry Pizza House's food we copied these jalapeño masala breadsticks they serve by adding pesto, thai green chillis, and red onions to our trusty pizza dough recipe. This was bomb. My sister's favorite.", tilt: -1.4 },
  { id: "ss4", name: "Thai Chicken Pizza", date: "01.05.26",
    photos: ["/food-pics/showstoppers/thai chicken pizza.JPG"],
    note: "My favorite pizza restaurant is California Pizza Kitchen solely because of their thai chicken pizza. We made a spicy peanut sauce with crunchy peanuts for the pizza sauce. Added chicken marinated in fish sauce, lime juice, and chillis, carrots, scallions, cilantro, and red onions for the toppings. This was scrumptious and a great tribute to my favorite pizza restaurant.", tilt: 2.2 },
  { id: "ss5", name: "Sesame Bagels", date: "09.26.23",
    photos: ["/food-pics/showstoppers/sesame bagels.JPG"],
    note: "One of the first breads my sister and I ever made. These turned out surprisingly fluffy. We unfortunately didn't have everything bagel seasoning or the ingredients to make it so we settled for sesame but these were amazing.", tilt: -2.6 },
  { id: "ss6", name: "All Spiced Chicken + Multicultural Spread", date: "10.17.25", dual: true,
    photos: ["/food-pics/showstoppers/all spiced chicken.JPG", "/food-pics/showstoppers/multicultural spread.JPG"],
    captions: ["All Spiced Chicken", "Multicultural Spread"],
    note: "My friends and I had gone to Ocean City, NJ for a retreat and I was largely in charge of preparing the food. These chicken thighs went triple platinum. I seasoned it with a harissa spice blend, cumin, chili powder, coriander, garlic, and some lime. Some other notable mentions from the spread: the roasted vegetables and carrots that are my mom's classic recipe, jollof rice, japanese curry noodles which are shown above the chicken, jollof rice, and a charcuterie board. A real family bonding experience here.", tilt: 1.4 },
  { id: "ss7", name: "Claire Saffitz's Carrot Cake", date: "12.26.25",
    photos: ["/food-pics/showstoppers/carrot cake.JPG"],
    note: "This was the cake my sister and I made for my 20th birthday. It took a whopping 6 hours. We followed Claire Saffitz's recipe and made it with brown butter cream cheese frosting. One thing about me is that I hate cream cheese and brown butter so I don't really know how I was gonna like this but it sounds more impressive. It was a lot of fun to make and still tasted really good since carrot cake is my favorite (chocolate is very close though). Overall, I didn't like it as much as I thought I would but everyone else did.", tilt: -1.8 },
  { id: "ss8", name: "Chocolate Sea Salt Granola", date: "07.31.25",
    photos: ["/food-pics/showstoppers/chocolate sea salt granola.JPG"],
    note: "This recipe is my absolute favorite. Ever heard of Purely Elizabeth? Well this granola hasn't because it is as good if not better. The salt perfectly compliments the dark chocolate flavor. There isn't that much added sugar either. We sweetened it with maple syrup, added chopped pecans, and almonds and sprinkled chopped chocolate at the end. We stopped buying granola after finding this recipe.", tilt: 2.4 },
  { id: "ss9", name: "Gochujang Glazed Chicken and Egg Drop Soup", date: "09.14.25",
    photos: ["/food-pics/showstoppers/gochujang glazed chicken with stir fried soy veggies and egg drop soup.JPG"],
    note: "One of the first meals my friend and I cooked at his apartment. We marinated the chicken thighs in a gochujang honey marinade, stir fried some vegetables with a soy ginger sauce we made, and made egg drop soup with corn. 5 star meal. The chicken was really juicy since we used his air fryer.", tilt: -1.0 },
  { id: "ss10", name: "Barbeque", date: "05.10.26",
    photos: ["/food-pics/showstoppers/barbeque.JPG"],
    note: "My friend really wanted to have an end of school year barbeque. I had never been to a barbeque before so I was excited. We spent two hours marinating lamb, beef, chicken wings, and eggplant with asian flavors. For the chicken (everyone's favorite) we used the classic spices I use like coriander and that and also some mutton biryani spice blend. That really added to it. I was in charge of barbequing and that was a lot of fun.", tilt: 1.6 },
  { id: "ss11", name: "The Great British Baking Show Cake", date: "01.09.26",
    photos: ["/food-pics/showstoppers/the great british baking show cake.JPG"],
    note: "After making my carrot cake my sister and I realized we could make any cake. So, we tackled the Great British Baking Show cake since that is what inspires a lot of our bakes. It was an unexpectedly large cake since our cake pan was really big but really chocolatey and decadent. Definitely needed more salt but it was still so good. The ganache was also pretty rich and didn't have the glossy finish a good ganache should have but it was our first time making ganache so it was a solid attempt.", tilt: -2.0 },
];

const COLLEGE_MEALS = [
  { id: "cm1", name: "Shrimp Peanut Yellow Curry + Yellow Tofu Curry", date: "09.07.26", dual: true,
    photos: ["/food-pics/college-meals/shrimp peanut yellow curry.JPG", "/food-pics/college-meals/yellow tofu curry.JPG"],
    captions: ["Shrimp Peanut Yellow Curry", "Yellow Tofu Curry"],
    note: "This was a recipe I made on repeat after discovering curry powder from my campus grocery store. Peanut butter is actually one of my favorite foods so adding it really enhanced the savory curry flavor and sweetness from the coconut milk.", tilt: -2.4 },
  { id: "cm2", name: "Red Shrimp Curry", date: "12.06.26",
    photos: ["/food-pics/college-meals/red shrimp curry.JPG"],
    note: "Continuing on with the curries, I had gotten red curry paste and added snap peas and mixed veggies. A solid simple meal.", tilt: 1.8 },
  { id: "cm2b", name: "Japanese Chicken Curry + Japanese Tofu Curry", date: "03.24.26", dual: true,
    photos: ["/food-pics/college-meals/japanese chicken curry.JPG", "/food-pics/college-meals/japanese tofu curry.JPG"],
    captions: ["Japanese Chicken Curry", "Japanese Tofu Curry"],
    note: "This recipe is also very simple since it only requires the Japanese curry cubes. I used 2-3 for a single recipe so that it would become thick and flavorful. I also added whatever veggies I had on hand, which was a lot since my friend bought a 5lb bag of mixed vegetables from Costco.", tilt: 1.4 },
  { id: "cm3", name: "Chicken Pot Pie", date: "02.07.26",
    photos: ["/food-pics/college-meals/chicken-pot-pie.jpg"],
    note: "Fun fact: this was the first chicken pot pie I had ever had. My friend and I spent 3 hours cooking this and the actual chicken gravy was pretty flavorful — Indian spices, blended cottage cheese to replace heavy cream, and Mediterranean spiced chicken. It was pretty good.", tilt: -1.6 },
  { id: "cm4", name: "Egg Whites, Spinach, and Mushrooms", date: "09.05.25",
    photos: ["/food-pics/college-meals/egg whites, spinach, and mushrooms.JPG"],
    note: "One of the first meals I made in my college kitchen. I realized that meals in college didn't have to be difficult. Stir fried the mushrooms with some chili and cumin and made spinach banchan for sides.", tilt: 2.2 },
  { id: "cm5", name: "Egg White Bibimbap + Tuna Bibimbap", date: "01.29.26", dual: true,
    photos: ["/food-pics/college-meals/egg white bibimbap.JPG", "/food-pics/college-meals/tuna bibimbap.JPG"],
    captions: ["Egg White Bibimbap", "Tuna Bibimbap"],
    note: "I'm sure you could tell from the other chapter that Korean cuisine is one of my favorites and bibimbap is just so simple to make. For the tuna bibimbap I cooked some zucchini and added avocado and for the egg white bibimbap I had the luxury of having pickled daikon and kimchi.", tilt: -2.8 },
  { id: "cm6", name: "Khichdi", date: "03.20.26",
    photos: ["/food-pics/college-meals/khichdi.JPG"],
    note: "Khichdi is an Indian comfort food that's kind of like spiced porridge. My favorite is made with quinoa and moong dal or split mung beans. I was really ill when I made this and had a lot of exams to study for but I felt healed while having it.", tilt: 1.4 },
  { id: "cm7", name: "Beets and Peas", date: "03.01.26",
    photos: ["/food-pics/college-meals/beets and peas.JPG"],
    note: "I randomly got a beet from the grocery store because the way my mom prepares it is one of my favorites. The cumin and bay leaf complement the sweetness from the beets very well and I was proud to have made it close to how my mom does.", tilt: -1.2 },
  { id: "cm8", name: "Curry Fried Rice + Curry Fried Noodles", date: "03.04.26", dual: true,
    photos: ["/food-pics/college-meals/curry fried rice.JPG", "/food-pics/college-meals/stir fried curry noodles.JPG"],
    captions: ["Curry Fried Rice", "Curry Fried Noodles"],
    note: "This is one of those fridge clean out meals — I just throw all the veggies in my fridge with some curry powder, egg whites, and chili and call it a day. The beautiful sunny side up egg yolk covers up the imperfections and emulsifies the flavors into a confusing but delicious bite.", tilt: 2.0 },
  { id: "cm9", name: "Miso Soup with Kale", date: "09.17.25",
    photos: ["/food-pics/college-meals/miso soup with kale.JPG"],
    note: "This was a meal I made on repeat after my friend had gifted me a tub of white miso paste. I often changed the vegetables that were in the soup, sometimes kale, sometimes spinach, but it always soothed me, especially in this last Philly winter.", tilt: -2.4 },
  { id: "cm10", name: "Lasagna Soup", date: "01.07.26",
    photos: ["/food-pics/college-meals/lasagna soup.JPG"],
    note: "This was a crowd favorite. The picture doesn't do it justice but I had toasted some spices before adding in the pasta sauce and again replaced heavy cream with blended cottage cheese and nutritional yeast. I asked my friends to come to my dorm to try it and they showed up within 30 seconds of me sending the text and each had 4 bowls.", tilt: 1.6 },
  { id: "cm11", name: "Northern Bean Pasta Soup", date: "02.23.26",
    photos: ["/food-pics/college-meals/northern bean pasta soup.JPG"],
    note: "I was really excited to cook these beans as I was soaking them all night and pressure cooked them with Sichuan peppercorns and bay leaves. Sauteed some onions and added the zest and juice of a lime that I stole from the dining hall. Overall, a light and tasty soup.", tilt: -1.8 },
  { id: "cm12", name: "Tomato Egg Stir Fry", date: "09.06.25",
    photos: ["/food-pics/college-meals/tomato egg.JPG"],
    note: "To be honest, I don't like eggs but I love ketchup. So there was some hope for this meal. Unfortunately, I don't think it works that well with egg whites but it wasn't bad.", tilt: 2.4 },
  { id: "cm13", name: "Egg Clump Soup", date: "05.09.26",
    photos: ["/food-pics/college-meals/egg clump soup.JPG"],
    note: "Ah, a classic. Most of you probably know this as egg drop soup but make it without egg yolks and leave it a little too long on the stove and you get these gorgeous clumps of egg! Still very tasty so don't be hesitant to give it a try!", tilt: -2.0 },
  { id: "cm14", name: "Egg White Pancake", date: "03.05.26", dual: true,
    photos: ["/food-pics/college-meals/egg white pancake.JPG", "/food-pics/college-meals/egg white pancake 2.JPG"],
    captions: ["Egg White Pancake", "Pancake Stack"],
    note: "On my final day at school before spring break I decided to do a fridge cleanout and make 22 egg white pancakes, because what else would I be doing? I did skip my day of classes for this and got sore for a day after from hand whisking all the egg whites but these froze and reheated decently.", tilt: 1.2 },
  { id: "cm15", name: "Garlic Shrimp with Roasted Veggies", date: "09.12.25",
    photos: ["/food-pics/college-meals/garlic shrimp with roasted veggies.JPG"],
    note: "Sauteed the shrimp with garlic and some chili flakes. Made roasted sweet potatoes and broccoli including the stems — those are the best part.", tilt: -1.4 },
  { id: "cm15b", name: "Hummus", date: "12.06.25",
    photos: ["/food-pics/college-meals/hummus.JPG"],
    note: "For all of first semester I was wishing for a blender so I made this with my friend's Ninja blender. Making hummus is very easy, we make it at home very frequently. Boiled canned chickpeas so that it would blend smoother, added some cloves of garlic, lemon, tahini, and ice. A great complement to everything. Once you have a dip in the fridge it's a matter of testing everything in your pantry with it.", tilt: 2.0 },
  { id: "cm16", name: "Tuna Bagel Sandwich", date: "02.13.26",
    photos: ["/food-pics/college-meals/tuna bagel sandwich.JPG"],
    note: "I love tuna salad and I make mine with cottage cheese, pickle brine, onions, and sriracha. Added some stolen dining hall goodies (tomato, cucumber) and some of my roommate's scallion cream cheese and made this beautiful sandwich. Fun fact: I only eat bagels open faced.", tilt: 2.6 },
  { id: "cm17", name: "Matcha Chia Pudding", date: "11.01.24",
    photos: ["/food-pics/college-meals/matcha chia pudding.JPG"],
    note: "The first chia pudding I ever made in college freshman year where I had no kitchen. This was also the birth of ChiaWala. I was so excited to try it the next day. Here I did a matcha chocolate shell as well and splurged with some cool whip from a floor event.", tilt: -2.2 },
  { id: "cm18", name: "Tiramisu Chia Pudding", date: "04.10.25",
    photos: ["/food-pics/college-meals/tiramisu chia pudding.JPG"],
    note: "This was one of my hit flavors for my chia pudding company. Made with Greek yogurt, maple syrup, oat milk, coffee from the dining hall, and chia seeds. Topped with cacao powder.", tilt: 1.0 },
  { id: "cm19", name: "Cinnamon Toast Crunch Chia Pudding", date: "11.16.24",
    photos: ["/food-pics/college-meals/cinnamon toast crunch chia pudding.JPG"],
    note: "A progression of flavor from matcha chia pudding. Pretty good.", tilt: -1.6 },
  { id: "cm19b", name: "Cinnamon Cottage Cheese Ice Cream", date: "03.05.26",
    photos: ["/food-pics/college-meals/cinnamon cottage cheese ice cream.JPG"],
    note: "I love this recipe. It is only sweetened with soaked dates. Just cottage cheese, dates, and cinnamon. The sweet spot for creaminess before it gets icy is 3 hours. When I offered this to my friends and asked them what's in it they immediately guessed cottage cheese because I was obsessing over it. I used to bring an empty container to the dining hall to steal cottage cheese. It was that serious.", tilt: -2.2 },
  { id: "cm20", name: "Stewed Apple Oatmeal", date: "09.15.25",
    photos: ["/food-pics/college-meals/stewed apple oatmeal.JPG"],
    note: "Had 5 apples in my dorm because it is one of the fruits our dining halls let us take so I stewed some of the apples in cinnamon and a little bit of maple syrup and cooked the oatmeal with chia seeds to thicken it and add fiber.", tilt: 2.2 },
  { id: "cm21", name: "Egg Whites with Roasted Sweet Potato", date: "02.14.26",
    photos: ["/food-pics/college-meals/egg whites with roasted sweet potato.JPG"],
    note: "A punishment for one of my clubs was making the younger class of pledges get me Japanese sweet potatoes (JSP). Now beginning my JSP era. This is essentially the same meal as #3 but with a slow roasted JSP.", tilt: -2.6 },
  { id: "cm22", name: "Caramelized Banana JSP Boat", date: "02.15.26",
    photos: ["/food-pics/college-meals/caramelized banana jsp boat.JPG"],
    note: "The other half of my JSP. I caramelized a banana and spread peanut butter and cottage cheese over my JSP. This was decadent but filling.", tilt: 1.8 },
  { id: "cm23", name: "Mexican JSP Bowl", date: "02.21.26",
    photos: ["/food-pics/college-meals/mexican JSP bowl.JPG"],
    note: "Continuing on with the series of pledge potatoes. I prepped cumin lime beans, fajita peppers, and ground chicken spiced with Guajillo chili and topped my JSP with them and some guac. To be honest, it was not that good.", tilt: -1.0 },
  { id: "cm24b", name: "Reese's Banana Bread", date: "05.09.26",
    photos: ["/food-pics/college-meals/reese's banana bread.JPG"],
    note: "Bananas were part of the free fruits we could take from the dining hall so naturally I would take 7 every time I went. I would then put them all in a single bag and call it my \"ethylene chamber\" to make them extremely ripe. I would then freeze them for smoothies or make banana bread. This was the last of my ethylene chamber and I had some Reese's pieces laying around so I made a healthy banana bread with 3 black bananas, oat flour, Greek yogurt, and powdered PB. This didn't need any other sweetener so it was very healthy.", tilt: -1.8 },
  { id: "cm24", name: "Tomato and Broccoli Pasta", date: "05.09.26",
    photos: ["/food-pics/college-meals/tomato and broccoli pasta.JPG"],
    note: "The last meal I cooked in my sophomore year dorm. The pasta I used was a clean protein pasta and I added some rotisserie chicken from the dining hall and some of my month old frozen broccoli. Sauteed some spices before adding in the pasta sauce to elevate the flavor and it was a good goodbye to my Rodin 1307 kitchen.", tilt: 2.4 },
];

const DESSERTS = [
  { id: "ds1", name: "Apple Pie", date: "11.27.23",
    photos: ["/food-pics/desserts/apple pie.JPG"],
    note: "Okay I know I said my family never makes dessert but this is the only exception. My dad actually takes the lead and we make this flaky pie crust with a sweet cinnamony apple filling. This served a la mode is my second favorite dessert.", tilt: -2.0 },
  { id: "ds2", name: "Apple Crisp", date: "07.29.24",
    photos: ["/food-pics/desserts/apple crisp.JPG"],
    note: "My sister and I were bored one night and had one apple remaining so we made this apple crisp. It wasn't too bad but the side of Van Leewen's Earl Grey ice cream you see pictured here tasted like literal black pepper — it ruined the whole dessert.", tilt: 1.6 },
  { id: "ds3", name: "Dubai Chocolate Mochi", date: "01.05.26", dual: true,
    photos: ["/food-pics/desserts/dubai chocolate mochi.jpeg", "/food-pics/desserts/dubai chocolate mochi 2.jpeg"],
    captions: ["Dubai Chocolate Mochi", "Cross Section"],
    note: "Gen Alpha's obsession with Dubai chocolate never ceases to amaze me. My sister loves pista and chocolate, so naturally she is a member of this cult. This was our first time making chocolate mochi and the chocolate flavor was kind of muted since we just used cacao powder. Overall, decent.", tilt: -1.4 },
  { id: "ds4", name: "Lemon Blueberry Scones", date: "06.13.25",
    photos: ["/food-pics/desserts/lemon blueberry scones.JPG"],
    note: "These were amazing. I thought that the best scone I would ever have would be the cranberry orange scones from Costco but these surpassed my expectations. Look at how they glisten.", tilt: 2.2 },
  { id: "ds5", name: "Lemon Crinkle Cookies", date: "05.26.25",
    photos: ["/food-pics/desserts/lemon crinkle cookies.JPG"],
    note: "Keeping up with the lemon theme are these cookies. For the longest time I didn't know how to get a chewy cookie so these were pretty cakey.", tilt: -2.6 },
  { id: "ds6", name: "Matcha Cookies", date: "05.19.24",
    photos: ["/food-pics/desserts/matcha cookies.JPG"],
    note: "These are my friends' and my favorite cookies. We make them every single time that we come back from college. The first chewy cookie that I have ever made.", tilt: 1.2 },
  { id: "ds7", name: "Double Chocolate Crinkle Cookies", date: "12.24.24",
    photos: ["/food-pics/desserts/double chocolate crinkle cookies.JPG"],
    note: "My sister and my only attempt to make a cookie for a Christmas cookie box. If you're wondering why the star shape it's because all the cookies flattened into one gigantic rectangle. These were way too sweet for my taste so I did eat them with a heaping spoon of salt, but my sister still dreams about these.", tilt: -1.8 },
  { id: "ds8", name: "Pumpkin Streusel Muffins", date: "10.09.25",
    photos: ["/food-pics/desserts/pumpkin streusel muffins.JPG"],
    note: "Perfect for autumn. The streusel added to the warm spices and some chew to contrast the fluffiness of the muffin.", tilt: 2.4 },
  { id: "ds9", name: "Triflavored Cinnamon Rolls", date: "03.15.26",
    photos: ["/food-pics/desserts/triflavored cinnamon rolls.JPG"],
    note: "Dubai chocolate, biscoff crumble, and classic cinnamon rolls. Inspired by my sister's love for Korean bakeries and mukbangs. These were really good.", tilt: -1.0 },
  { id: "ds10", name: "Lava Cake + Maple Sea Salt Pecan Ice Cream", date: "09.01.25", dual: true,
    photos: ["/food-pics/desserts/lava cake.JPG", "/food-pics/desserts/lava cake with maple sea salt ice cream.JPG"],
    captions: ["Lava Cake", "Maple Sea Salt Pecan Ice Cream"],
    note: "This was the dessert for my very close family friends. The ooze was perfect and of course I added a lot of salt to counter the decadence of the rich dark chocolate. The ice cream was made with maple toasted pecans, maple syrup, some cinnamon, and a lot of sea salt to contrast the sweetness. Amazing flavor.", tilt: 1.8 },
  { id: "ds11", name: "Carrot Cake Ice Cream", date: "01.04.26",
    photos: ["/food-pics/desserts/carrot cake ice cream.JPG"],
    note: "Carrot cake is my favorite cake flavor. We shredded carrots, caramelized pecans, added carrot cake spices, ginger, and sweetened with maple syrup for a deeper flavor. Also extremely good flavor.", tilt: -2.2 },
  { id: "ds12", name: "Pistachio Cheesecake Ice Cream", date: "03.05.25",
    photos: ["/food-pics/desserts/pistachio cheesecake ice cream.png"],
    note: "This was made with pistachio cream cheese imported from Spread Bagelry which is the bagel shop located on Penn's campus. The hand pictured in this image is my best friend's and she is always the taster of all of these desserts. She never has much to say just mmmmm. But for this she said, \"I would die for this ice cream.\" Made with the imported cream cheese, toasted pistachios, and browned butter.", tilt: 2.0 },
  { id: "ds13", name: "Apple Pie Ice Cream", date: "11.27.25",
    photos: ["/food-pics/desserts/apple pie ice cream.JPG"],
    note: "Yes, this is the ice cream we served a la mode with the apple pie and it was pure brilliance. Stewed apples, caramelized pecans, and cinnamon streusel mixed in. It was a textural and flavorful masterpiece. My favorite ice cream flavor.", tilt: -1.6 },
  { id: "ds14", name: "Chaicecream", date: "05.23.25",
    photos: ["/food-pics/desserts/chaicecream.JPG"],
    note: "This was also a stroke of genius. We made chaicecream #homagetomyculture. I don't usually drink chai so my first time making chai was for this ice cream but it was so good. We sweetened it with jaggery which is like palm sugar and the chaicecream sandwich you see here is between 2 biscuits called Mary Biscuits which are traditionally dipped in chai but they made the perfect semisweet vessels to sandwich the chaicecream. This is a close second to my favorite flavor.", tilt: 1.4 },
  { id: "ds15", name: "Mango Sticky Rice", date: "05.12.26",
    photos: ["/food-pics/desserts/mango sticky rice.JPEG"],
    note: "The most overrated dessert of all time. It is only good if the mangoes are sweet. There isn't much contrast in flavors. I just included it because it looks nice.", tilt: -2.4 },
  { id: "ds16", name: "Tiramisu", date: "06.11.25",
    photos: ["/food-pics/desserts/tiramisu.JPG"],
    note: "My sister and I made this for my dad's 54th birthday. We got the last mascarpone from our neighborhood store but forgot to get ladyfingers so we ended up making them from scratch. Call us Nara, no Smith.", tilt: 2.6 },
  { id: "ds17", name: "Mochi Pancake", date: "01.10.26",
    photos: ["/food-pics/desserts/mochi pancake.JPG"],
    note: "This is the most perfect pancake you will ever see. I made this for my sister's birthday breakfast. Kind of chewy, kind of sweet, a solid pancake.", tilt: -1.2 },
  { id: "ds18", name: "Mini Cornbread", date: "10.04.24",
    photos: ["/food-pics/desserts/mini cornbread.JPG"],
    note: "My best friend and my favorite dessert. We will bake a whole pan and eat all of it. Nothing is as good as cornbread. This batch had bits of corn in it as well. Unpopular opinion but I like the texture of the cornmeal and a drier cornbread.", tilt: 1.0 },
];

const HEALTHY_RECIPES = [
  { id: "hr1", name: "Acai Bowl", date: "12.31.25",
    photos: ["/food-pics/healthy-recipes/acai_bowl.JPG"],
    note: "Wow, I guess this was my last lunch of 2025. It was really good because I finally learned how to make a thick smoothie. The key is frozen bananas and a lot of ice. This bowl looks especially glorious because of the thick drizzle of PB.", tilt: -2.0 },
  { id: "hr2", name: "Greek Yogurt Bagels", date: "03.13.25",
    photos: ["/food-pics/healthy-recipes/greek yogurt bagels.JPG"],
    note: "This recipe went viral and for good reason. It's very simple to make with bread flour and Greek yogurt and though the inside was kind of dense, the subtle sour taste from the Greek yogurt added to the tang from the cream cheese.", tilt: 1.6 },
  { id: "hr3", name: "Kale Apple Walnut Salad", date: "07.09.25",
    photos: ["/food-pics/healthy-recipes/kale apple walnut salad.JPG"],
    note: "I think there are 3 important components to a salad. 1. the leaf which here is kale massaged in olive oil and salt. 2. the fruit. I love fruit in salad and the crunch and sweetness from the apple complement the kale perfectly. 3. the crunch. I used toasted walnuts here. Also the dressing but I just did a simple golden dressing: lemon, Dijon mustard, olive oil, and maple syrup. Solid salad.", tilt: -1.4 },
  { id: "hr4", name: "Carrot Ginger Chicken Salad", date: "12.30.25",
    photos: ["/food-pics/healthy-recipes/carrot ginger chicken salad.jpeg"],
    note: "This was inspired from the salad I would eat at my school's dining hall. They had this really good carrot ginger soy dressing which I replicated here. Carrot, ginger, sesame oil, rice vinegar, soy sauce, and honey. Didn't have any ready made protein on hand so I just air fried some Costco chicken nuggets and toasted some almonds. Perfect complement.", tilt: 2.2 },
  { id: "hr5", name: "Mango Summer Rolls", date: "05.14.26",
    photos: ["/food-pics/healthy-recipes/mango summer rolls.JPG"],
    note: "Summer rolls are one of my favorite foods because they're so fresh and of course the peanut sauce. I like to make them with lettuce, cucumbers, carrots, avocado, tofu, and the most important ingredient: mango. It adds the best sweetness with a bit of tanginess that complements the nuttiness from the peanut sauce. Since my sister is feeble and has a 1% peanut allergy we also make a delicious nuoc cham with lime, fish sauce, chillis, and sugar. I also make this at college since it's so simple.", tilt: -2.6 },
  { id: "hr6", name: "Vegetable Udon Stir Fry", date: "05.09.25",
    photos: ["/food-pics/healthy-recipes/vegetable udon stir fry.JPG"],
    note: "My sister, my best friend, and I made this for the blind deaf mute challenge. Thank god I wasn't the blind one otherwise nothing would get done. Stir fried a bunch of vegetables and made a garlic chili oil to top it off. Pretty good for the circumstances.", tilt: 1.2 },
  { id: "hr6b", name: "Cabbage Rolls", date: "05.29.26",
    photos: ["/food-pics/healthy-recipes/cabbage rolls.JPG"],
    note: "If you're wondering why these are in a Tupperware it's not because I was taking them to work or school, but to the movies. Not just any movie, but the scariest movie I've seen in a while: Obsession. These made watching the gore a little better. I stuffed with a mixture of kimchi, crumbled tofu, mushrooms, spinach, scallions, and mung bean sprouts. Then I blanched some napa cabbage, made the rolls, and pan fried them before topping with more soy sauce and Lao Gan Ma.", tilt: -2.0 },
  { id: "hr7", name: "Turkish Yogurt Pasta", date: "03.16.26",
    photos: ["/food-pics/healthy-recipes/turkish yogurt pasta.JPG"],
    note: "This was trending on TikTok and my sister is the biggest yogurt fan so I made it for both of us. Seasoned the ground chicken with cumin, coriander, paprika, chili powder, garlic, and salt. Added yogurt and the smoked paprika oil. Overall, not bad. I was worried the cold yogurt would taste odd with the hot oil and chicken but it neutralized the tang from Greek yogurt.", tilt: -1.8 },
  { id: "hr8", name: "Reese's Puffs", date: "05.12.25",
    photos: ["/food-pics/healthy-recipes/reese's puffs.JPG"],
    note: "Another Nara no Smith moment. These were made with oat flour, maple syrup, and PB and cacao powder. The PB puffs were good but the chocolate ones needed some more sweetness. They tasted good in milk. It took like 2 hours to roll these by hand though.", tilt: 2.4 },
  { id: "hr9", name: "Lemon Blueberry Loaf", date: "01.08.25",
    photos: ["/food-pics/healthy-recipes/lemon blueberry loaf.JPG"],
    note: "This was probably the best no refined sugar loaf that I have made. The cinnamon \"streusel\" on top was a great addition. This was sweetened with ripe bananas and a bit of maple syrup but the bread didn't have a very banana-y taste. Added lemon juice and zest for extra lemony flavor and the blueberries were very sweet.", tilt: -1.0 },
  { id: "hr10", name: "Cottage Cheese Cornbread + Cottage Cheese Cornbread Ice Cream", date: "05.23.26", dual: true,
    photos: ["/food-pics/healthy-recipes/cottage cheese cornbread.JPG", "/food-pics/healthy-recipes/cottage cheese cornbread ice cream.JPG"],
    captions: ["Cottage Cheese Cornbread", "Cornbread Ice Cream"],
    note: "My best friend was going to come over so I wanted to make a healthy cornbread with cottage cheese and Greek yogurt. I added bits of sweet corn but it was still too tangy and oddly moist. Keeping up with the cornbread theme I made this ice cream to complement the cornbread with the same base as the cinnamon CC ice cream. It was also not sweet enough but eating this with the cornbread was pretty good.", tilt: 1.8 },
];

const FOOD_AROUND_WORLD = [
  { id: "fw1", name: "Arayes", date: "",
    photos: ["/food-pics/food-around-the-world/arepas.JPG"],
    region: "lebanon",
    note: "These are a common Arab street food. They are pita pockets filled with raw ground chicken that are cooked meat side down on the pan and then seared on all sides. My sister and I made the pita pocket with Greek yogurt and flour and it wasn't the fluffiest but a good healthy alternative. Added lettuce and onions and ate them with non-traditional but the second best sauce of all time: Maggi Hot and Sweet sauce. Overall, very good and would eat again.", tilt: -2.2 },
  { id: "fw2", name: "Nan Gyi Thoke", date: "",
    photos: ["/food-pics/food-around-the-world/burmese khao suey.JPG"],
    region: "myanmar",
    note: "Made these with my Burmese international friend from Penn. She said that this is commonly eaten dry even though there is a soupy alternative. The key comes from toasting besan or chickpea flour which adds this rich nutty flavor to the noodles. Cooked the rest of the noodles and chicken with turmeric, paprika, fish sauce, and some lime. This was delicious and it was cool to make it with my friend because she said it's one of her favorite dishes from home.", tilt: 1.6 },
  { id: "fw3", name: "Pita Pockets", date: "", dual: true,
    photos: ["/food-pics/food-around-the-world/pita pockets.JPG", "/food-pics/food-around-the-world/pita pockets 2.JPG"],
    captions: ["Pita Pockets", "The Spread"],
    region: "greece",
    note: "Okay we didn't use a spinner for this and it doesn't belong to a specific country but this was my 20th birthday dinner. My sister and I of course made the pita pockets using our Greek yogurt recipe, pickled onions and red cabbage, marinated and cooked chicken shawarma, and made falafels since my best friend is vegetarian. The key to this is the pomegranate. Made a homemade tzatziki and also toom which is like a garlic sauce. The star was definitely the falafel. 10/10 meal.", tilt: -1.4 },
  { id: "fw4", name: "Chicken Bibimbap", date: "",
    photos: ["/food-pics/food-around-the-world/chicken bibimbap.JPG"],
    region: "korea",
    note: "You know I love my bibimbap. Look at me at my fullest potential when I am supported with a surplus of vegetables. Classic carrot, spinach, and one of my comfort meals and the dish that made me like runny eggs. Growing up, my dad would force me to eat a boiled egg every morning even though I hated eggs more than anything. So this dish is very powerful.", tilt: 2.0 },
  { id: "fw5", name: "Dak Galbi", date: "",
    photos: ["/food-pics/food-around-the-world/dak galbi.JPG"],
    region: "korea",
    note: "I wanted to cook the dish that combined two of my favorite things: sweet potatoes and chicken. I made it with my Korean international friend from Penn and to be honest, it wasn't my favorite. I thought it was a little too sweet but he really likes it.", tilt: -2.6 },
  { id: "fw6", name: "Seafood Soondubu", date: "",
    photos: ["/food-pics/food-around-the-world/seafood soondubu.JPG"],
    region: "korea",
    note: "Can you tell what my favorite cuisine is? This soup is so comforting and I was shocked that it tasted even better than any of the restaurants I had tried because I didn't use anchovy stalk, I just put some dried kombu. I used this to clean out my fridge but the flavor was on point.", tilt: 1.4 },
  { id: "fw7", name: "Kimbap + Shrimp Kimbap", date: "", dual: true,
    photos: ["/food-pics/food-around-the-world/kimbap.JPG", "/food-pics/food-around-the-world/shrimp kimbap.JPG"],
    captions: ["Kimbap", "Shrimp Kimbap"],
    region: "korea",
    note: "My mom randomly got obsessed with wanting to make kimbap and since she's allergic to soy and MSG she doesn't get to eat a lot of Asian food, but she could eat this. Seasoned the shrimp with chili, lime, garlic, and sesame seeds. Made enoki mushroom and spinach banchan to stuff these. My mom really enjoyed it and so did I.", tilt: -1.0 },
  { id: "fw8", name: "Chicken Dum Biryani", date: "",
    photos: ["/food-pics/food-around-the-world/chicken dum biryani.JPG"],
    region: "india",
    note: "My dad's favorite food. We don't have an actual dum which is like a clay pot used for making biryani and which traps in heat really well cooking all the layers of the biryani, but we simulate by sealing the lid of the biggest pot we have with dough. The chicken in this recipe is untraditional; it's these chicken meatballs we always make with coriander, onions, garlic, sumac, paprika, cumin, coriander, and chili powder. That is my favorite form of chicken. Obviously we fried onions, added potatoes, boiled eggs, and garnished with lots of coriander. This was glorious. I don't love biryani as much as my dad, because he could've had the whole thing. But I do really like it. Look at the assertive grip he has on the spoon.", tilt: 2.4 },
  { id: "fw9", name: "Cod Majboos", date: "",
    photos: ["/food-pics/food-around-the-world/cod majboos.JPG"],
    region: "united arab emirates",
    note: "This was interesting because it was one of my first times making cod (since my mom mainly cooks all the fish). It was on its last legs and was starting to smell. Marinated it with chili powder, cumin, turmeric, and pepper. Toasted some spices like cinnamon, peppercorn, clove, cardamom, and a special black dried lime called loomi which added a subtle citrus flavor and reduced some water in those spices to make a kind of broth. You first fry the fish, then cook it more in the broth, then cook rice in the remaining broth. It was sort of like a fish biryani but I definitely overeseasoned and overcooked the fish because I didn't anticipate the amount of time I would have to cook the fish in the broth. I also added way too much chili because it was so smoky and spicy. It was a good experience though and tasted good with yogurt.", tilt: -1.8 },
  { id: "fw10", name: "Harissa Chicken", date: "",
    photos: ["/food-pics/food-around-the-world/harrissa chicken.JPG"],
    region: "tunisia",
    note: "You see how I feel about pomegranate and Mediterranean marinated meat. Marinated the chicken thighs with honey, harissa, some herbs, and classic Middle Eastern spices. This was absolutely delicious and probably the best chicken that I have ever made...yet.", tilt: 1.2 },
  { id: "fw11", name: "Jollof Rice + Nigerian Chicken Stew", date: "", dual: true,
    photos: ["/food-pics/food-around-the-world/jollof rice.JPG", "/food-pics/food-around-the-world/nigerian chicken stew.JPG"],
    captions: ["Jollof Rice", "Nigerian Chicken Stew"],
    region: "nigeria",
    note: "This was my first time making jollof. Unfortunately, I did not get scotch bonnet peppers so this was more tomatoey than spicy. It also took 3 hours to make but it was still good. The chicken stew tasted very similar to how my mom makes chicken stew so it was really good. The dishes complement each other well.", tilt: -2.4 },
  { id: "fw12", name: "Mushroom Dumplings", date: "",
    photos: ["/food-pics/food-around-the-world/mushroom dumplings.JPG"],
    region: "china",
    note: "We were having a gathering at our house and since many of our family friends are vegetarian we chose to make mushroom and tofu dumplings. The inside was a pretty classic dumpling filling: ginger, scallions, tofu, mushroom, and carrots. It was pretty good. I probably wrapped around 50 of them. I was a machine.", tilt: 2.2 },
  { id: "fw13", name: "Focaccia", date: "",
    photos: ["/food-pics/food-around-the-world/foccaccia.JPG"],
    region: "italy",
    note: "My second time making focaccia. Topped with sun dried tomatoes (oops they kinda burnt) and rosemary. My favorite part of this was the dimpling of course but our yeast was kind of old so the crumb was pretty dense and stodgy. Still tasted very good though, especially with a caprese salad and some balsamic.", tilt: -1.6 },
  { id: "fw14", name: "Neapolitan Margherita Pizza", date: "",
    photos: ["/food-pics/food-around-the-world/neopolitan margherita pizza.JPG"],
    region: "italy",
    note: "Shoutout Vincenzo on YouTube. His pizza dough recipe is incredible. This was my sister and my first time making pizza dough from scratch and though the whole process took like 4 hours + time for cold fermentation, this was one of the best pizzas I have ever had. I was borrowing my friend's steel pizza pan and we preheated the oven by broiling for an hour. It was shockingly crispy and had these beautiful bubbles in the crust. The crust is my favorite part of pizza. We topped it with basil from our basil plant and it was simple but amazing.", tilt: 2.6 },
];

function SaltShaker() {
  return (
    <svg viewBox="0 0 200 380" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M 64 70 C 64 38, 78 22, 100 22 C 122 22, 136 38, 136 70 Z" />
      <path d="M 60 70 L 140 70 L 140 82 L 60 82 Z" />
      <line x1="60" y1="74" x2="140" y2="74" />
      <line x1="60" y1="78" x2="140" y2="78" />
      <circle cx="100" cy="34" r="1.5" />
      <circle cx="88" cy="38" r="1.5" />
      <circle cx="112" cy="38" r="1.5" />
      <circle cx="82" cy="48" r="1.5" />
      <circle cx="100" cy="48" r="1.5" />
      <circle cx="118" cy="48" r="1.5" />
      <path d="M 70 82 L 130 82 L 130 96 L 70 96 Z" />
      <path d="M 70 96 L 130 96 L 158 348 L 42 348 Z" />
      <line x1="50" y1="340" x2="150" y2="340" />
      <line x1="86" y1="96" x2="74" y2="348" />
      <line x1="100" y1="96" x2="100" y2="348" />
      <line x1="114" y1="96" x2="126" y2="348" />
    </svg>
  );
}

function Fill({ width = "long", placeholder = "" }) {
  return (
    <span
      className={`fill-line ${width}`}
      contentEditable="true"
      suppressContentEditableWarning
      data-ph={placeholder}
    />
  );
}

function CoverPage({ onOpen }) {
  return (
    <div className="page right cover" onClick={onOpen}>
      <div className="cover-spine" />
      <div className="cover-shaker"><SaltShaker /></div>
      <div className="cover-frame" />
      <div className="cover-inner">
        <div className="cover-top">
          <h1 className="cover-title-stack">
            <span className="row" style={{ fontWeight: "500", fontFamily: '"Playfair Display"' }}>ADD</span>
            <span className="row" style={{ fontWeight: "500", fontFamily: '"Playfair Display"' }}>SALT<span className="dot">.</span></span>
          </h1>
          <div className="cover-rule" style={{ height: "0px" }} />
          <div className="cover-sub">A kitchen<br />notebook</div>
        </div>
        <div className="cover-bottom">
          <div className="cover-byline">
            by
            <span className="name">SHRISHTI ROY</span>
          </div>
          <div className="cover-vol">Vol. I<br />MMXXVI</div>
        </div>
      </div>
      <div className="cover-hint" />
    </div>
  );
}

function InsideFrontPage() {
  return (
    <div className="page-inner inside-front">
      <div className="stamp">Property of Shrishti Roy — kitchen no. 1</div>
      <div className="meta" style={{ marginTop: 'auto' }}>
        <div style={{ fontSize: 13, lineHeight: 1.6 }}>
          A working notebook of dishes I've cooked and experimented with.
        </div>
        <div style={{ height: 14 }} />
        <div style={{ fontSize: 12 }}>
          <strong>Entries from</strong> November 2024
        </div>
        <div style={{ fontSize: 12 }}>
          <strong>To</strong> May 2026
        </div>
        <div style={{ height: 24 }} />
        <div style={{ fontStyle: 'italic', fontSize: 12, opacity: .75, color: 'var(--ink-soft)' }}>
          "You are what you eat. That's why I cook the most beautiful, intelligent, creative, versatile, and funny meals ;P"
        </div>
      </div>
    </div>
  );
}

function ForewordPage() {
  return (
    <div className="page-inner foreword">
      <div className="eyebrow">Foreword</div>
      <h1>Hello, chef.</h1>
      <div className="foreword-text" style={{ marginTop: 8, fontSize: 13, lineHeight: 1.65, color: 'var(--ink)' }}>
        <p style={{ margin: '0 0 10px' }}>I'd like to dedicate this book to my mom who is hands down the best cook I know and who feeds people with so much joy and passion it is as if she makes money for each second serving they take. She taught me how to eat and cook healthy and always pushes me to break the bounds of whatever I am doing.</p>
        <p style={{ margin: 0 }}>I would also like to acknowledge my sister for all our midnight cooking adventures and for her endless hunger. Half of these dishes would not have been made if it wasn't to satiate her midnight cravings &lt;3.</p>
      </div>
      <div className="sign-off" style={{ marginTop: 18 }}>
        — shrishti
      </div>
    </div>
  );
}

function AboutMePage() {
  return (
    <div className="page-inner foreword about-me-page">
      <div className="eyebrow">About Me</div>
      <h1>Hi there.</h1>
      <div style={{ marginTop: 8, fontSize: 12, lineHeight: 1.6, color: 'var(--ink)' }}>
        <p style={{ margin: 0 }}>I'm Shrishti. I am a Computer Science student at the University of Pennsylvania with a passion for cooking. Cooking is how I spend time with my family and friends. I even started a prepackaged chia pudding company, ChiaWala, for a bit to explore new fields. Some of my hobbies include running, playing soccer, and photography.</p>
      </div>
      <div className="about-me-polaroid">
        <div className="polaroid mini-pol" style={{ transform: 'rotate(-2deg)' }}>
          <div className="tape tl" />
          <img src="/about-me.JPG" alt="Shrishti in hotdog costume" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', objectPosition: '60% 30%', display: 'block', borderRadius: '1px' }} />
          <div className="pol-cap">my 2 fav foods</div>
        </div>
      </div>
    </div>
  );
}

function CookingPhilosophyPage() {
  return (
    <div className="page-inner foreword">
      <div className="eyebrow">Cooking Philosophy</div>
      <h1 style={{ fontSize: 24 }}>My inspiration.</h1>
      <div style={{ marginTop: 8, fontSize: 11.5, lineHeight: 1.6, color: 'var(--ink)' }}>
        <p style={{ margin: '0 0 8px' }}>Cooking has always been a passion of mine. I adopted it from my mom who has been cooking almost every meal for me since I was born. We are Bengali which if you don't know means we eat a lot of fish and seafood. Her cooking philosophy is simplify the number of ingredients used but maximize flavor.</p>
        <p style={{ margin: '0 0 8px' }}>She has an autoimmune disease which makes her allergic to dairy, gluten, soy, refined sugar, cruciferous vegetables, and most processed foods in general. Our family also doesn't eat beef or pork and growing up I used to eat lamb and goat (my mom makes the BEST mutton curry) but after my best friend and I saved a goat from the expressway I gave up red meat completely….unless it's In-N-Out or a baseball stadium hotdog.</p>
        <p style={{ margin: 0 }}>Anyways, most of my cooking is inspired from my mom and I hope to be a tenth of how talented she is. If you're wondering what my favorite food is, peer through my kitchen notebook and take a guess!</p>
      </div>
    </div>
  );
}

function ShowstoppersTitle() {
  return (
    <div className="page-inner foreword">
      <div className="eyebrow">Chapter One</div>
      <h1 style={{ fontSize: 28 }}>Showstoppers</h1>
      <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.65, color: 'var(--ink-soft)' }}>
        <p style={{ margin: 0 }}>These are the most gobsmacking finger licking dream worthy meals that I have made. This section also features times that I prepared foods for large gatherings or events. This is also peer reviewed so most of these are fan favorites as well.</p>
      </div>
    </div>
  );
}

function CollegeMealsTitle() {
  return (
    <div className="page-inner foreword">
      <div className="eyebrow">Chapter Two</div>
      <h1 style={{ fontSize: 28 }}>College Meals</h1>
      <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.65, color: 'var(--ink-soft)' }}>
        <p style={{ margin: 0 }}>At Penn, we are forced to be on the dining plan for the first two years and it is — surprise — not good. I did everything in my willpower to not eat there since all the food either had a sodium warning or was cooked in kilograms of grease. A lot of the time I stole ingredients from the dining hall to prep my own meals as you will soon see. I wanted to make this section to show you that it isn't that hard to cook in college. For all my meals, I prioritize healthy eating specifically protein and fiber to support my recovery from my workouts and most importantly whole foods. Most of my meals are some sort of protein, vegetable, paired with a carb.</p>
      </div>
    </div>
  );
}

function TocPage({ onGoTo, onSearch }) {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    const all = [...SHOWSTOPPERS, ...COLLEGE_MEALS, ...HEALTHY_RECIPES, ...FOOD_AROUND_WORLD, ...DESSERTS];
    return all.filter(d => {
      const name = d.name.toLowerCase();
      return words.every(w => name.includes(w) || name.split(/\s+/).some(n => n.startsWith(w)));
    }).slice(0, 6);
  }, [query]);

  return (
    <div className="page-inner toc">
      <div className="eyebrow">Index</div>
      <h2>What I made.</h2>
      <ol>
        <li onClick={() => onGoTo?.('showstoppers-title')} style={{ cursor: 'pointer' }}>
          <span className="num" style={{ fontWeight: 600 }}>Ch. 1&ensp;</span>
          <span style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: 14 }}>Showstoppers</span>
          <span className="dots" />
        </li>
        <li onClick={() => onGoTo?.('college-title')} style={{ cursor: 'pointer' }}>
          <span className="num" style={{ fontWeight: 600 }}>Ch. 2&ensp;</span>
          <span style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: 14 }}>College Meals</span>
          <span className="dots" />
        </li>
        <li onClick={() => onGoTo?.('healthy-title')} style={{ cursor: 'pointer' }}>
          <span className="num" style={{ fontWeight: 600 }}>Ch. 3&ensp;</span>
          <span style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: 14 }}>Healthy Recipes</span>
          <span className="dots" />
        </li>
        <li onClick={() => onGoTo?.('world-title')} style={{ cursor: 'pointer' }}>
          <span className="num" style={{ fontWeight: 600 }}>Ch. 4&ensp;</span>
          <span style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: 14 }}>Food Around the World</span>
          <span className="dots" />
        </li>
        <li onClick={() => onGoTo?.('desserts-title')} style={{ cursor: 'pointer' }}>
          <span className="num" style={{ fontWeight: 600 }}>Ch. 5&ensp;</span>
          <span style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: 14 }}>Desserts</span>
          <span className="dots" />
        </li>
      </ol>
      <div className="toc-search">
        <input
          type="text"
          className="toc-search-input"
          placeholder="Search dishes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {results.length > 0 && (
          <ul className="toc-search-results">
            {results.map(d => (
              <li key={d.id} onClick={() => { onSearch?.(d.id); setQuery(''); }}>
                {d.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function HealthyRecipesTitle() {
  return (
    <div className="page-inner foreword">
      <div className="eyebrow">Chapter Three</div>
      <h1 style={{ fontSize: 28 }}>Healthy Recipes</h1>
      <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.65, color: 'var(--ink-soft)' }}>
        <p style={{ margin: 0 }}>I like to eat very healthy prioritizing whole foods. Additionally, since my mom has so many allergies, my sister and I try to make healthy desserts for her as you will see.</p>
      </div>
    </div>
  );
}

function FoodAroundWorldTitle() {
  return (
    <div className="page-inner foreword">
      <div className="eyebrow">Chapter Four</div>
      <h1 style={{ fontSize: 28 }}>Food Around the World</h1>
      <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.65, color: 'var(--ink-soft)' }}>
        <p style={{ margin: 0 }}>My sister and I made it a mission in 2025 summer to cook a dish from every country. I love discovering new food especially from cultures that I've never tried before. We spin a wheel and pick a dish that is either super popular or just sounds interesting and aren't red meat. So prepare for a trip around the world!</p>
      </div>
    </div>
  );
}

function DessertsTitle() {
  return (
    <div className="page-inner foreword">
      <div className="eyebrow">Chapter Five</div>
      <h1 style={{ fontSize: 28 }}>Desserts</h1>
      <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.65, color: 'var(--ink-soft)' }}>
        <p style={{ margin: 0 }}>I never really had a sweet tooth. Even the little sweet tooth that I had, I lost for a year after trying the Cookie Bits Sundae from Ghirardelli Square. Additionally, since my mom is allergic to refined sugar and my dad is on a no sugar diet, my sister and I didn't grow up eating dessert. It's only after she watched a lot of YouTube mukbangs and I started getting TikToks about healthy desserts did we start making it. However, since my parents never made any dessert my sister and I had full independence over what we could make, and we ran with it.</p>
      </div>
    </div>
  );
}

function DishPage({ dish, index }) {
  const polRest = `rotate(${dish.tilt}deg)`;
  if (dish.dual) {
    return (
      <div className="dish layout-polaroid dual" style={{ "--pol-rest": polRest }}>
        <div className="dual-photos">
          {dish.photos.map((src, i) => (
            <div key={i} className="polaroid mini" style={{ transform: `rotate(${i === 0 ? dish.tilt : -dish.tilt}deg)` }}>
              <div className="tape tl" />
              <img className="photo" src={src} alt={dish.captions?.[i] || dish.name} draggable="false" style={dish.focuses?.[i] ? { objectPosition: dish.focuses[i] } : undefined} />
              <div className="pol-cap">{dish.captions?.[i] || ''}</div>
            </div>
          ))}
        </div>
        <div className="dish-foot">
          <div className="date">{dish.region || dish.date}</div>
          <div className="dish-note">— {dish.note}</div>
        </div>
        <div className="page-number">{index + 1}</div>
      </div>
    );
  }
  return (
    <div className="dish layout-polaroid" style={{ "--pol-rest": polRest }}>
      <div className="polaroid-wrap">
        <div className="polaroid" style={{ transform: polRest }}>
          <div className="tape tl" />
          <div className="tape tr" />
          <img className="photo" src={dish.photos[0]} alt={dish.name} draggable="false" style={dish.focus ? { objectPosition: dish.focus } : undefined} />
          <div className="pol-cap">{dish.name}</div>
        </div>
      </div>
      <div className="dish-foot">
        <div className="date">{dish.region || dish.date}</div>
        <div className="dish-note">— {dish.note}</div>
      </div>
      <div className="page-number">{index + 1}</div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="page-inner contact">
      <div className="eyebrow">Stage Inquiries</div>
      <h2>Let's cook.</h2>
      <ul>
        <li><span>Email</span><span>shrishtir06@gmail.com</span></li>
        <li><span>Phone</span><span>408-623-8786</span></li>
        <li><span>Based in</span><span>Philadelphia, PA</span></li>
      </ul>
    </div>
  );
}

function buildPages(goToKey) {
  const allDishes = [...SHOWSTOPPERS, ...COLLEGE_MEALS, ...HEALTHY_RECIPES, ...FOOD_AROUND_WORLD, ...DESSERTS];
  const searchByDishId = (id) => {
    const d = allDishes.find(x => x.id === id);
    if (!d) return;
    const prefix = d.id.startsWith('ss') ? 'showstopper' : d.id.startsWith('cm') ? 'dish' : d.id.startsWith('hr') ? 'healthy' : d.id.startsWith('fw') ? 'world' : 'dessert';
    goToKey(`${prefix}-${id}`);
  };
  const list = [
    { key: "cover", render: (props) => <CoverPage {...props} /> },
    { key: "inside-front", render: () => <InsideFrontPage /> },
    { key: "foreword", render: () => <ForewordPage /> },
    { key: "about-me", render: () => <AboutMePage /> },
    { key: "cooking-philosophy", render: () => <CookingPhilosophyPage /> },
    { key: "toc", render: () => <TocPage onGoTo={goToKey} onSearch={searchByDishId} /> },
    { key: "showstoppers-title", render: () => <ShowstoppersTitle /> },
  ];
  SHOWSTOPPERS.forEach((d, i) => {
    list.push({
      key: `showstopper-${d.id}`,
      render: () => <DishPage dish={d} index={i} />,
      label: d.name,
    });
  });
  list.push({ key: "college-title", render: () => <CollegeMealsTitle /> });
  COLLEGE_MEALS.forEach((d, i) => {
    list.push({
      key: `dish-${d.id}`,
      render: () => <DishPage dish={d} index={i} />,
      label: d.name,
    });
  });
  list.push({ key: "healthy-title", render: () => <HealthyRecipesTitle /> });
  HEALTHY_RECIPES.forEach((d, i) => {
    list.push({
      key: `healthy-${d.id}`,
      render: () => <DishPage dish={d} index={i} />,
      label: d.name,
    });
  });
  list.push({ key: "world-title", render: () => <FoodAroundWorldTitle /> });
  FOOD_AROUND_WORLD.forEach((d, i) => {
    list.push({
      key: `world-${d.id}`,
      render: () => <DishPage dish={d} index={i} />,
      label: d.name,
    });
  });
  list.push({ key: "desserts-title", render: () => <DessertsTitle /> });
  DESSERTS.forEach((d, i) => {
    list.push({
      key: `dessert-${d.id}`,
      render: () => <DishPage dish={d} index={i} />,
      label: d.name,
    });
  });
  list.push({ key: "contact", render: () => <ContactPage /> });
  if (list.length % 2 === 1) {
    list.push({ key: "blank", render: () => <div className="page-inner" /> });
  }
  return list;
}

function Book() {
  const goToKeyRef = useRef(null);
  const goToKey = useCallback((key) => { goToKeyRef.current?.(key); }, []);
  const pages = useMemo(() => buildPages(goToKey), [goToKey]);
  const lastSpread = Math.floor((pages.length - 1) / 2);
  const [spread, setSpread] = useState(0);
  const [flip, setFlip] = useState(null);
  const lockRef = useRef(false);

  const spreadForKey = useCallback((key) => {
    const idx = pages.findIndex(p => p.key === key);
    if (idx <= 0) return 0;
    return Math.ceil(idx / 2);
  }, [pages]);

  const goToSpread = useCallback((target) => {
    if (lockRef.current) return;
    if (target < 0 || target > lastSpread || target === spread) return;
    setSpread(target);
  }, [spread, lastSpread]);

  goToKeyRef.current = (key) => goToSpread(spreadForKey(key));

  const turn = useCallback((dir) => {
    if (lockRef.current) return;
    const to = spread + dir;
    if (to < 0 || to > lastSpread) return;
    lockRef.current = true;
    setFlip({ dir, fromSpread: spread, toSpread: to, phase: 'mount' });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFlip((f) => f ? { ...f, phase: 'animate' } : null);
      });
    });
    const ms = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--flip-ms')) || 900;
    setTimeout(() => {
      setSpread(to);
      setFlip(null);
      lockRef.current = false;
    }, ms + 30);
  }, [spread, lastSpread]);


  useEffect(() => {
    const onKey = (e) => {
      const sect = document.querySelector('.book-section');
      if (!sect) return;
      const r = sect.getBoundingClientRect();
      const inView = r.top < window.innerHeight * 0.6 && r.bottom > window.innerHeight * 0.4;
      if (!inView) return;
      if (e.key === "ArrowRight") { e.preventDefault(); turn(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); turn(-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [turn]);

  const pageAt = (idx) => pages[idx]?.render({ onOpen: () => turn(1) }) || null;
  const leftIdxFor = (S) => S === 0 ? -1 : 2 * S - 1;
  const rightIdxFor = (S) => S === 0 ? 0 : 2 * S;

  const curLeftIdx = leftIdxFor(spread);
  const curRightIdx = rightIdxFor(spread);

  let flipFront = null, flipBack = null, flipSide = "right", flipping = false, deg = 0;
  if (flip) {
    flipping = true;
    const targetDeg = flip.dir === 1 ? -180 : 180;
    deg = flip.phase === 'animate' ? targetDeg : 0;
    if (flip.dir === 1) {
      flipSide = "right";
      flipFront = pageAt(curRightIdx);
      flipBack = pageAt(leftIdxFor(flip.toSpread));
    } else {
      flipSide = "left";
      flipFront = pageAt(curLeftIdx);
      flipBack = pageAt(rightIdxFor(flip.toSpread));
    }
  }

  const stableLeft = flipping
    ? (flip.dir === 1 ? pageAt(curLeftIdx) : pageAt(leftIdxFor(flip.toSpread)))
    : pageAt(curLeftIdx);
  const stableRight = flipping
    ? (flip.dir === 1 ? pageAt(rightIdxFor(flip.toSpread)) : pageAt(curRightIdx))
    : pageAt(curRightIdx);

  const wrap = (side, node, key, isCover = false) => {
    if (!node) return null;
    if (isCover) return <div key={key}>{node}</div>;
    return (
      <div className={`page ${side} paper`} key={key}>
        {node}
      </div>
    );
  };

  return (
    <>
      <div
        className="book"
        data-open={spread > 0 || (flip && flip.toSpread > 0) ? "true" : "false"}>

        <div className="book-base" />

        {spread > 0 && wrap("left", stableLeft, `L-${spread}-${flipping ? 'f' : 's'}`)}

        {curRightIdx === 0 && !flipping
          ? wrap("right", stableRight, `R-cover`, true)
          : wrap("right", stableRight, `R-${spread}-${flipping ? 'f' : 's'}`, false)
        }

        {flipping && (
          <div
            className={`flipper ${flipSide} flipping`}
            style={{
              transform: `rotateY(${deg}deg)`,
              transition: `transform var(--flip-ms) var(--flip-ease)`,
            }}>
            <div className="face front">
              {flip.dir === 1 && curRightIdx === 0
                ? flipFront
                : <div className={`page ${flipSide} paper`} style={{ position: 'absolute', inset: 0 }}>{flipFront}</div>
              }
            </div>
            <div className="face back">
              <div className={`page ${flipSide === 'right' ? 'left' : 'right'} paper`} style={{ position: 'absolute', inset: 0 }}>
                {flipBack}
              </div>
            </div>
            <div className="curl" />
          </div>
        )}
      </div>

      <button
        className="nav-arrow prev"
        onClick={() => turn(-1)}
        disabled={spread === 0}
        aria-label="Previous page">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 5 9 12 15 19" /></svg>
      </button>
      <button
        className="nav-arrow next"
        onClick={() => turn(1)}
        disabled={spread >= lastSpread}
        aria-label="Next page">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 5 15 12 9 19" /></svg>
      </button>

      {spread > 0 && (
        <button className="back-to-toc" onClick={() => goToSpread(spreadForKey('toc'))}>
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 5 9 12 15 19"/></svg>
          <span>Index</span>
        </button>
      )}

    </>
  );
}

function SaltParticles({ originX, originY }) {
  const flakes = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 20 - 10,
      drift: (Math.random() - 0.5) * 60,
      width: 2 + Math.random() * 3,
      height: 1.5 + Math.random() * 2,
      borderRadius: Math.random() > 0.5 ? '50%' : '1px',
      delay: i * 70 + Math.random() * 60,
    }));
  }, []);

  return (
    <div className="salt-particles" style={{ left: originX, top: originY }}>
      {flakes.map(f => (
        <div
          key={f.id}
          className="salt-flake"
          style={{
            left: f.left + 'px',
            width: f.width + 'px',
            height: f.height + 'px',
            borderRadius: f.borderRadius,
            animationDelay: f.delay + 'ms',
            '--drift': f.drift + 'px',
          }}
        />
      ))}
    </div>
  );
}

function HeroAbout() {
  const shakerRef = useRef(null);
  const heroSideRef = useRef(null);
  const [sprinkling, setSprinkling] = useState(false);
  const [spoutPos, setSpoutPos] = useState(null);

  const smoothScrollToBook = useCallback(() => {
    const bookEl = document.querySelector('.book-section');
    if (!bookEl) return;
    const bookTop = bookEl.getBoundingClientRect().top + window.scrollY;
    const start = window.scrollY;
    const distance = bookTop - start - 40;
    const duration = 2000;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      window.scrollTo(0, start + distance * ease);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  const handleShakerClick = () => {
    if (sprinkling) return;
    setSprinkling(true);

    setTimeout(() => {
      const shakerEl = shakerRef.current;
      const parentEl = heroSideRef.current;
      if (shakerEl && parentEl) {
        const parentRect = parentEl.getBoundingClientRect();
        // Get the SVG element inside the shaker div
        const svg = shakerEl.querySelector('svg');
        if (svg) {
          // The spout holes are around (100, 34) in the SVG viewBox (0 0 200 380)
          // Use SVG's built-in coordinate transform to get screen position
          const pt = svg.createSVGPoint();
          pt.x = 100;
          pt.y = 34;
          const ctm = svg.getScreenCTM();
          const screenPt = pt.matrixTransform(ctm);
          setSpoutPos({
            x: screenPt.x - parentRect.left,
            y: screenPt.y - parentRect.top,
          });
        }
      }
      smoothScrollToBook();
    }, 700);

    setTimeout(() => {
      setSprinkling(false);
      setSpoutPos(null);
    }, 3500);
  };

  return (
    <section className="hero">
      <div className="hero-text">
        <div className="hero-eyebrow">ORIGIN</div>
        <h2 className="hero-title">
          <span className="why" style={{ fontSize: "50px", fontFamily: "serif" }}>Why</span>
          <span className="add" style={{ fontSize: "40px" }}>add salt<span className="dot">?</span></span>
        </h2>
        <div className="hero-rule" style={{ margin: "0px 0px 7px", width: "140px" }} />
        <div className="hero-body">
          <p>
            It only takes one question for my little sister and my face to light up. "So what should we make?"
          </p>
          <p>
            This leads to a frenzy of suggestions and an even larger frenzy of whipping up our ideas. I'm always the final taste tester and for every single dish, from our rosemary focaccia to our carrot cake ice cream, my sister will approve of it. I'll give it one taste and tell her, add salt.
            It's these memories of cooking with my sister that I cherish most. Despite our 7 year age gap, the possibilities behind what to make bond us together.
          </p>
          <p style={{ marginTop: 24 }}>
            <button
              type="button"
              className="read-link"
              onClick={smoothScrollToBook}
              aria-label="Read the book">
              <span className="read-label">Read the book</span>
              <span className="read-mark" aria-hidden="true">
                <span className="read-line" />
                <span className="read-arrow">↓</span>
              </span>
            </button>
          </p>
        </div>
      </div>
      <div className="hero-side" ref={heroSideRef}>
        <div className="shaker-group">
          <div className="shaker-container" onClick={handleShakerClick}>
            <div
              ref={shakerRef}
              className={`hero-shaker ${sprinkling ? 'sprinkling' : ''}`}
            >
              <SaltShaker />
            </div>
          </div>
          {!sprinkling && <div className="shaker-hint">click to <span className="hint-bold">ADD SALT</span></div>}
        </div>
        <div className="sister-polaroid pinned-polaroid">
          <div className="pin" />
          <img src="/me-and-sister.JPG" alt="Shrishti and her sister cooking" />
          <div className="sister-cap">me and my sister</div>
        </div>
        {spoutPos && <SaltParticles originX={spoutPos.x + 'px'} originY={spoutPos.y + 'px'} />}
      </div>
    </section>
  );
}

function AboutSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`about ${visible ? 'about-visible' : ''}`} ref={sectionRef}>
      <div className="about-intro">
        <div className="about-greeting">Welcome to my kitchen</div>
        <h2 className="about-headline">
          I'm <span className="about-name">Shrishti</span>
        </h2>
        <p className="about-body">
          This is my kitchen notebook — a collection of dishes I've dreamed up,
          experimented with, and cooked with love. Feel free to take a look
          and get to know me a little better through my palate.
        </p>
      </div>
      <div className="about-photo-wrap">
        <div className="pinned-polaroid">
          <div className="pin" />
          <img
            className="about-photo"
            src="/header-pic.JPG"
            alt="Shrishti Roy"
          />
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="page-shell">
      <header className="wordmark">
        <div className="brand">ADD SALT.</div>
        <div className="meta">est. 2026</div>
      </header>

      <AboutSection />
      <HeroAbout />

      <section className="book-section">
        <Book />
      </section>

      <footer className="closer">
        <h3>Find me</h3>
        <p className="lead">For stages, trails, or a quick chat about a dish.</p>
        <div className="contact-row">
          <div className="item">
            <div className="label">Email</div>
            <div className="val">shrishtir06@gmail.com</div>
          </div>
          <div className="item">
            <div className="label">Phone</div>
            <div className="val">408-623-8786</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
