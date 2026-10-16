const generateId = (prefix) => `${prefix}-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

const menuItems = [
  // --- DOSAS ---
  { id: 'GD-D17', name: 'Cheese Burst Dosa', description: 'Cheese that will leave you craving for more.', price: 155, category: 'Dosas', categoryCode: 'DOSAS', image: '/images/cheese-dosa.jpg', rating: 4.9, reviewsCount: 1420, isBestseller: true, isVeg: true, prepTime: 8, calories: 590, tags: ['Cheese Burst', 'Gooey', 'Bestseller'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-D18', name: 'Schezwan Cheese Dosa', description: 'Crispy golden dosa smeared with fiery schezwan sauce, smothered with a snowfall of grated cheese, melted butter and fresh coriander.', price: 165, category: 'Dosas', categoryCode: 'DOSAS', image: '/images/schezwan-cheese-dosa.jpg', rating: 4.8, reviewsCount: 1580, isBestseller: true, isVeg: true, prepTime: 8, calories: 560, tags: ['Schezwan', 'Cheese Burst', 'Spicy', 'Fusion', 'Bestseller'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-D19', name: 'Schezwan Paneer Dosa', description: 'Crispy folded dosa on a rustic wooden platter filled with fiery schezwan sauce, tender diced paneer cubes, spring onions and carrots, served with dual tempered chutneys.', price: 165, category: 'Dosas', categoryCode: 'DOSAS', image: '/images/schezwan-paneer-dosa.jpg', rating: 4.9, reviewsCount: 1480, isBestseller: true, isVeg: true, prepTime: 8, calories: 580, tags: ['Schezwan', 'Paneer', 'Fusion', 'Spicy', 'Wooden Platter'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-D20', name: 'Cream Cheese Dosa', description: 'Crisp cone-folded golden crepe oozing with warm bubbling melted cream cheese, finely diced tomatoes, green chilies and fresh herbs.', price: 155, category: 'Dosas', categoryCode: 'DOSAS', image: '/images/cream-cheese-dosa.jpg', rating: 4.8, reviewsCount: 1190, isBestseller: true, isVeg: true, prepTime: 7, calories: 520, tags: ['Cream Cheese', 'Rich', 'Velvety', 'Molten Cheese', 'Bestseller'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-D01', name: 'Plain Dosa', description: 'Golden-crisp roasted semi-circle dosa served on fresh banana leaf with aromatic vegetable sambar and tempered coconut chutney.', price: 65, category: 'Dosas', categoryCode: 'DOSAS', image: '/images/plain-dosa.jpg', rating: 4.8, reviewsCount: 1920, isBestseller: true, isVeg: true, prepTime: 5, calories: 280, tags: ['Crispy', 'Classic', 'Light', 'Banana Leaf'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-D02', name: 'Govind Dosa', description: "[Chef's Special] Govind ji’s legendary signature creation — drenched in butter, spiced potato masala, sautéed onions & fresh coriander.", price: 115, category: 'Dosas', categoryCode: 'DOSAS', image: '/images/govind-dosa.jpg', rating: 4.9, reviewsCount: 3840, isBestseller: true, isVeg: true, prepTime: 7, calories: 480, tags: ['Chef\'s Special', 'Spicy', 'Signature', 'Bestseller'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-D03', name: 'Onion Dosa', description: 'Thin and crispy dosa with a filling of seasoned onions.', price: 95, category: 'Dosas', categoryCode: 'DOSAS', image: '/images/onion-dosa.jpg', rating: 4.7, reviewsCount: 1420, isBestseller: false, isVeg: true, prepTime: 6, calories: 340, tags: ['Crispy', 'Onion', 'Flavorful'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-D04', name: 'Diet Dosa', description: 'Crisp green moong and multigrain roasted crepe prepared with zero oil, served with fresh tempered coconut chutney.', price: 75, category: 'Dosas', categoryCode: 'DOSAS', image: '/images/diet-dosa.jpg', rating: 4.7, reviewsCount: 940, isBestseller: false, isVeg: true, prepTime: 5, calories: 210, tags: ['Diet', 'Zero Oil', 'Healthy', 'Protein Rich', 'Moong Dal'], customizable: { butter: false, spice: true, extras: true } },
  { id: 'GD-D05', name: 'Karam Dosa', description: 'Dosa topped with a spicy karam chilli paste.', price: 95, category: 'Dosas', categoryCode: 'DOSAS', image: '/images/karam-dosa.jpg', rating: 4.9, reviewsCount: 2950, isBestseller: true, isVeg: true, prepTime: 6, calories: 420, tags: ['Karam Smeared', 'Spicy', 'Bestseller'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-D06', name: 'Ravva Dosa', description: 'Lacy, crackling roasted semolina crepe tempered with crushed black pepper, cumin and ginger.', price: 95, category: 'Dosas', categoryCode: 'DOSAS', image: '/images/rava-dosa.jpg', rating: 4.7, reviewsCount: 1120, isBestseller: false, isVeg: true, prepTime: 8, calories: 360, tags: ['Rava', 'Crunchy', 'Lacy'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-D07', name: 'Butter Dosa', description: 'Rich golden dosa bathed in pure sizzling Amul butter right off the hot tawa.', price: 95, category: 'Dosas', categoryCode: 'DOSAS', image: '/images/masala-dosa.jpg', rating: 4.8, reviewsCount: 2410, isBestseller: true, isVeg: true, prepTime: 6, calories: 460, tags: ['Amul Butter', 'Rich', 'Golden'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-D08', name: 'Cheese Dosa', description: 'Dosa filled with a generous amount of cheese.', price: 135, category: 'Dosas', categoryCode: 'DOSAS', image: '/images/cheese-dosa.jpg', rating: 4.8, reviewsCount: 1890, isBestseller: true, isVeg: true, prepTime: 8, calories: 540, tags: ['Cheese', 'Molten', 'Popular'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-D09', name: 'Paneer Dosa', description: 'Indulge in the rich and paneer delight of this delectable veg dosa, perfect for any meal.', price: 135, category: 'Dosas', categoryCode: 'DOSAS', image: '/images/paneer-cheese-dosa.jpg', rating: 4.7, reviewsCount: 1530, isBestseller: false, isVeg: true, prepTime: 8, calories: 510, tags: ['Paneer', 'Protein Rich', 'Soft'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-D10', name: 'Butter Plain Dosa', description: 'Golden crisp dosa toasted on tawa in bubbling Amul butter, served on banana leaf with piping sambar and fresh coconut chutney.', price: 95, category: 'Dosas', categoryCode: 'DOSAS', image: '/images/plain-dosa.jpg', rating: 4.8, reviewsCount: 1440, isBestseller: false, isVeg: true, prepTime: 5, calories: 380, tags: ['Paper Thin', 'Butter', 'Classic'], customizable: { butter: true, spice: false, extras: true } },
  { id: 'GD-D11', name: 'Pepper Kothmeer Dosa', description: 'Vibrant green, crispy lacy dosa ground with fresh coriander paste and cracked black pepper, served with chili-tempered coconut chutney.', price: 95, category: 'Dosas', categoryCode: 'DOSAS', image: '/images/pepper-kothmeer-dosa.jpg', rating: 4.8, reviewsCount: 1220, isBestseller: true, isVeg: true, prepTime: 6, calories: 350, tags: ['Pepper', 'Kothmeer', 'Herbal', 'Crispy', 'Signature Green'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-D12', name: 'Corn Dosa', description: 'Sweet golden corn kernels sautéed in butter with mild South Indian masala stuffed inside crispy dosa.', price: 100, category: 'Dosas', categoryCode: 'DOSAS', image: '/images/corn-dosa.jpg', rating: 4.7, reviewsCount: 780, isBestseller: false, isVeg: true, prepTime: 8, calories: 470, tags: ['Sweet Corn', 'Cheese Corn', 'Butter', 'Crunchy'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-D13', name: 'Uthappa', description: 'Thick dosa topped with vegetables, typically served with chutney.', price: 95, category: 'Dosas', categoryCode: 'DOSAS', image: '/images/onion-dosa.jpg', rating: 4.6, reviewsCount: 1100, isBestseller: false, isVeg: true, prepTime: 7, calories: 390, tags: ['Uttapam', 'Fluffy', 'Hearty'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-D14', name: 'Schezwan Dosa', description: 'A flavour packed dosa topped with hot and spicy schezwan sauce served with chutney and sambar.', price: 135, category: 'Dosas', categoryCode: 'DOSAS', image: '/images/schezwan-dosa.jpg', rating: 4.7, reviewsCount: 1340, isBestseller: false, isVeg: true, prepTime: 8, calories: 510, tags: ['Schezwan', 'Spicy', 'Fusion'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-D15', name: 'Pizza Dosa', description: 'A crispy golden brown dosa topped with veggies, cheese & special masalas, served with chutney.', price: 165, category: 'Dosas', categoryCode: 'DOSAS', image: '/images/pizza-dosa.jpg', rating: 4.8, reviewsCount: 1670, isBestseller: true, isVeg: true, prepTime: 9, calories: 610, tags: ['Pizza', 'Cheese Burst', 'Kids Favorite'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-D16', name: 'Paneer Cheese Dosa', description: 'A flavour packed dish with crispy dosa prepared with a layer of chutney, generous paneer and melted cheese.', price: 155, category: 'Dosas', categoryCode: 'DOSAS', image: '/images/paneer-cheese-dosa.jpg', rating: 4.9, reviewsCount: 2210, isBestseller: true, isVeg: true, prepTime: 9, calories: 670, tags: ['Paneer Cheese', 'Loaded', 'Bestseller'], customizable: { butter: true, spice: true, extras: true } },

  // --- IDLY ---
  { id: 'GD-I01', name: 'Plain Idly', description: 'Simple steamed rice cakes, soft and fluffy.', price: 65, category: 'Idly', categoryCode: 'IDLY', image: '/images/butter-idly.jpg', rating: 4.7, reviewsCount: 1820, isBestseller: false, isVeg: true, prepTime: 3, calories: 190, tags: ['Steamed', 'Healthy', 'Breakfast'], customizable: { butter: true, spice: false, extras: true } },
  { id: 'GD-I02', name: 'Butter Idly', description: 'Idli topped with melted butter.', price: 95, category: 'Idly', categoryCode: 'IDLY', image: '/images/butter-idly.jpg', rating: 4.8, reviewsCount: 1490, isBestseller: true, isVeg: true, prepTime: 4, calories: 290, tags: ['Amul Butter', 'Soft', 'Indulgent'], customizable: { butter: true, spice: false, extras: true } },
  { id: 'GD-I03', name: 'Tawa Idly', description: 'Idli cooked on a tawa until crispy on the outside.', price: 105, category: 'Idly', categoryCode: 'IDLY', image: '/images/tawa_idli.jpg', rating: 4.9, reviewsCount: 3410, isBestseller: true, isVeg: true, prepTime: 6, calories: 340, tags: ['Tawa Fried', 'Iconic', 'Bestseller'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-I04', name: 'Sambar Idly', description: 'Two soft idlis completely immersed in a bowl of aromatic, tangy piping hot Hyderabad sambar.', price: 75, category: 'Idly', categoryCode: 'IDLY', image: '/images/idli-sambar.jpg', rating: 4.8, reviewsCount: 1750, isBestseller: true, isVeg: true, prepTime: 3, calories: 230, tags: ['Sambar Dip', 'Piping Hot', 'Traditional'], customizable: { butter: false, spice: false, extras: true } },
  { id: 'GD-I05', name: 'Ghee Idly', description: 'Idli drenched in aromatic ghee.', price: 105, category: 'Idly', categoryCode: 'IDLY', image: '/images/ghee-idly.jpg', rating: 4.8, reviewsCount: 1280, isBestseller: true, isVeg: true, prepTime: 4, calories: 280, tags: ['Desi Ghee', 'Podi', 'Aromatic'], customizable: { butter: false, spice: true, extras: true } },
  { id: 'GD-I06', name: 'Cheese Idly', description: 'Cheese Idly with karam pudi and ghee.', price: 135, category: 'Idly', categoryCode: 'IDLY', image: '/images/cheese-idly.jpg', rating: 4.7, reviewsCount: 940, isBestseller: false, isVeg: true, prepTime: 6, calories: 390, tags: ['Cheese', 'Tawa', 'Fusion'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-I07', name: 'Paneer Idly', description: 'Tawa-fried idli cubes tossed with soft paneer, onions, curry leaves and mild seasonings.', price: 125, category: 'Idly', categoryCode: 'IDLY', image: '/images/paneer-idly.jpg', rating: 4.7, reviewsCount: 890, isBestseller: false, isVeg: true, prepTime: 6, calories: 370, tags: ['Paneer', 'High Protein', 'Savory'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-I08', name: 'Karam Idly', description: 'Steamed idli topped with a spicy karam [chilli] mixture.', price: 95, category: 'Idly', categoryCode: 'IDLY', image: '/images/karam-idly.jpg', rating: 4.8, reviewsCount: 1610, isBestseller: true, isVeg: true, prepTime: 5, calories: 260, tags: ['Karam', 'Spicy', 'Street Style'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-I09', name: 'Idli 65', description: 'Crispy golden fried idli wedges wok-tossed in fiery tangy 65 masala with whole roasted dry red chilies, mustard seeds and fresh coriander.', price: 135, category: 'Idly', categoryCode: 'IDLY', image: '/images/idli-65.jpg', rating: 4.8, reviewsCount: 1680, isBestseller: true, isVeg: true, prepTime: 7, calories: 350, tags: ['Idli 65', 'Spicy', 'Crispy', 'Tangy', 'Bestseller'], customizable: { butter: true, spice: true, extras: false } },
  { id: 'GD-I10', name: 'Schezwan Idly', description: 'Three soft steamed idlis bathed in spicy fiery schezwan seasoning, served on a black oblong platter with fresh green chutney and tomato dip.', price: 135, category: 'Idly', categoryCode: 'IDLY', image: '/images/schezwan-idly.jpg', rating: 4.8, reviewsCount: 1190, isBestseller: false, isVeg: true, prepTime: 7, calories: 380, tags: ['Schezwan', 'Spicy', 'Indo-Chinese Fusion', 'Platter'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-I11', name: 'Paneer Cheese Idly', description: 'Tawa-seared idlis layered with rich grated paneer and blanketed with molten cheese.', price: 145, category: 'Idly', categoryCode: 'IDLY', image: '/images/paneer-cheese-idly.jpg', rating: 4.9, reviewsCount: 1180, isBestseller: true, isVeg: true, prepTime: 8, calories: 490, tags: ['Paneer Cheese', 'Decadent', 'Loaded'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-I12', name: 'Spot Idly', description: 'Mini idlis seasoned with special spot masala.', price: 135, category: 'Idly', categoryCode: 'IDLY', image: '/images/spot-idly.jpg', rating: 4.9, reviewsCount: 2890, isBestseller: true, isVeg: true, prepTime: 8, calories: 420, tags: ['Spot Idly', 'Live Tawa', 'Hyderabad Special', 'Bestseller'], customizable: { butter: true, spice: true, extras: true } },

  // --- WADA ---
  { id: 'GD-W01', name: 'Plain Wada', description: 'Deep fried lentil doughnuts, crispy on the outside and soft inside.', price: 65, category: 'Wada', categoryCode: 'WADA', image: '/images/wada-sambar.jpg', rating: 4.7, reviewsCount: 1540, isBestseller: false, isVeg: true, prepTime: 4, calories: 290, tags: ['Crispy', 'Classic', 'Fluffy'], customizable: { butter: false, spice: false, extras: true } },
  { id: 'GD-W02', name: 'Tawa Wada', description: 'Crispy wada pressed on the hot buttered tawa with spicy gunpowder podi and onions.', price: 85, category: 'Wada', categoryCode: 'WADA', image: '/images/tawa-wada.jpg', rating: 4.8, reviewsCount: 1390, isBestseller: true, isVeg: true, prepTime: 6, calories: 370, tags: ['Tawa Roasted', 'Spicy', 'Crunchy'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-W03', name: 'Wada Sambar', description: 'Vada served with a side of flavorful sambhar.', price: 75, category: 'Wada', categoryCode: 'WADA', image: '/images/wada-sambar.jpg', rating: 4.8, reviewsCount: 1680, isBestseller: false, isVeg: true, prepTime: 3, calories: 320, tags: ['Sambar Dip', 'Piping Hot', 'Traditional'], customizable: { butter: false, spice: false, extras: true } },
  { id: 'GD-W04', name: 'Butter Roasted Wada', description: 'Pan-toasted in bubbling Amul butter until extra crunchy and fragrant.', price: 85, category: 'Wada', categoryCode: 'WADA', image: '/images/tawa-wada.jpg', rating: 4.8, reviewsCount: 1120, isBestseller: false, isVeg: true, prepTime: 5, calories: 410, tags: ['Butter Roasted', 'Extra Crisp', 'Rich'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-W05', name: 'Paneer Wada', description: 'Crispy golden lentil patties with a crunchy crust, stuffed with a steaming filling of spiced crumbled paneer and fresh coriander.', price: 125, category: 'Wada', categoryCode: 'WADA', image: '/images/paneer-wada.jpg', rating: 4.8, reviewsCount: 1120, isBestseller: true, isVeg: true, prepTime: 6, calories: 440, tags: ['Paneer Stuffed', 'High Protein', 'Crispy', 'Savory'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-W06', name: 'Cheese Wada', description: 'Golden crispy wada drenched with hot melted cheddar cheese.', price: 125, category: 'Wada', categoryCode: 'WADA', image: '/images/paneer-cheese-wada.jpg', rating: 4.7, reviewsCount: 880, isBestseller: false, isVeg: true, prepTime: 6, calories: 480, tags: ['Cheese', 'Molten', 'Cheesy'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-W07', name: 'Wada 65', description: 'Bite-sized crispy vada pieces tossed in spicy South Indian 65 seasoning with roasted red chilies and curry leaves.', price: 135, category: 'Wada', categoryCode: 'WADA', image: '/images/wada-65.jpg', rating: 4.7, reviewsCount: 910, isBestseller: false, isVeg: true, prepTime: 7, calories: 390, tags: ['Wada 65', 'Spicy', 'Tangy', 'Crispy'], customizable: { butter: false, spice: true, extras: false } },
  { id: 'GD-W08', name: 'Paneer Cheese Wada', description: 'Vada with a filling of paneer and cheese.', price: 135, category: 'Wada', categoryCode: 'WADA', image: '/images/paneer-cheese-wada.jpg', rating: 4.9, reviewsCount: 1040, isBestseller: true, isVeg: true, prepTime: 8, calories: 560, tags: ['Paneer Cheese', 'Loaded', 'Bestseller'], customizable: { butter: true, spice: true, extras: true } },

  // --- MYSORE BAJJI ---
  { id: 'GD-M01', name: 'Mysore Bajji', description: 'Four golden fluffy fritters made with fermented flour and curd, served with fresh coconut chutney.', price: 50, category: 'Mysore Bajji', categoryCode: 'MYSORE_BAJJI', image: '/images/tawa-mysore-bajji.jpg', rating: 4.8, reviewsCount: 2280, isBestseller: true, isVeg: true, prepTime: 4, calories: 320, tags: ['Classic', 'Fluffy', 'Snack'], customizable: { butter: false, spice: false, extras: true } },
  { id: 'GD-M02', name: 'Tawa Mysore Bajji', description: 'Split open and roasted on a sizzling tawa with butter, onion, karam and curry leaves.', price: 75, category: 'Mysore Bajji', categoryCode: 'MYSORE_BAJJI', image: '/images/tawa-mysore-bajji.jpg', rating: 4.9, reviewsCount: 1950, isBestseller: true, isVeg: true, prepTime: 6, calories: 390, tags: ['Tawa Roasted', 'Spicy', 'Bestseller'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-M03', name: 'Butter Roasted Mysore Bajji', description: 'Pan-toasted in sizzling Amul butter for an ultra-rich crispy exterior.', price: 75, category: 'Mysore Bajji', categoryCode: 'MYSORE_BAJJI', image: '/images/tawa-mysore-bajji.jpg', rating: 4.7, reviewsCount: 1210, isBestseller: false, isVeg: true, prepTime: 5, calories: 430, tags: ['Amul Butter', 'Crispy', 'Rich'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-M04', name: 'Paneer Mysore Bajji', description: 'Stuffed with fresh grated paneer, roasted podi and a dash of lemon juice.', price: 100, category: 'Mysore Bajji', categoryCode: 'MYSORE_BAJJI', image: '/images/paneer-cheese-mysore-bajji.jpg', rating: 4.7, reviewsCount: 840, isBestseller: false, isVeg: true, prepTime: 6, calories: 450, tags: ['Paneer Stuffed', 'Savory', 'Warm'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-M05', name: 'Cheese Mysore Bajji', description: 'Golden-crisp and fluffy round bajjis served on banana leaf, lavishly smothered with bubbling molten cheese, finely grated shreds and green chilies, served with trio of chutneys.', price: 100, category: 'Mysore Bajji', categoryCode: 'MYSORE_BAJJI', image: '/images/cheese-mysore-bajji.jpg', rating: 4.9, reviewsCount: 1420, isBestseller: true, isVeg: true, prepTime: 6, calories: 480, tags: ['Cheese', 'Molten', 'Mozzarella', 'Banana Leaf', 'Bestseller'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-M06', name: 'Paneer Cheese Mysore Bajji', description: 'Fluffy golden bajjis on banana leaf crowned with tender fresh malai paneer cubes, blanketed in bubbling molten cheese, roasted podi and green chilies, served with three chutneys.', price: 125, category: 'Mysore Bajji', categoryCode: 'MYSORE_BAJJI', image: '/images/paneer-cheese-mysore-bajji.jpg', rating: 4.9, reviewsCount: 1680, isBestseller: true, isVeg: true, prepTime: 7, calories: 580, tags: ['Paneer Cheese', 'Malai Paneer', 'Molten Cheese', 'Banana Leaf', 'Bestseller'], customizable: { butter: true, spice: true, extras: true } },

  // --- UPMA ---
  { id: 'GD-U01', name: 'Tawa Upma', description: 'Flavourful and aromatic veg delicious will delight your taste buds.', price: 135, category: 'Upma', categoryCode: 'UPMA', image: '/images/upma.jpg', rating: 4.9, reviewsCount: 2650, isBestseller: true, isVeg: true, prepTime: 6, calories: 380, tags: ['Tawa Upma', 'Signature', 'Bestseller'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-U02', name: 'Butter Upma', description: 'Upma meets butter and adds a yummy flavour.', price: 135, category: 'Upma', categoryCode: 'UPMA', image: '/images/butter-upma.jpg', rating: 4.8, reviewsCount: 1410, isBestseller: true, isVeg: true, prepTime: 5, calories: 340, tags: ['Butter Upma', 'Soft', 'Comforting'], customizable: { butter: true, spice: false, extras: true } },
  { id: 'GD-U03', name: 'Kothmeer Upma', description: 'Upma flavored with fresh coriander leaves.', price: 135, category: 'Upma', categoryCode: 'UPMA', image: '/images/butter-upma.jpg', rating: 4.7, reviewsCount: 880, isBestseller: false, isVeg: true, prepTime: 6, calories: 330, tags: ['Kothmeer', 'Herbal', 'Fresh'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-U04', name: 'Cheese Upma', description: 'Upma served with Cheese and Coconut chutney.', price: 155, category: 'Upma', categoryCode: 'UPMA', image: '/images/cheese-upma.jpg', rating: 4.7, reviewsCount: 920, isBestseller: false, isVeg: true, prepTime: 6, calories: 440, tags: ['Cheese', 'Creamy', 'Warm'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-U05', name: 'Paneer Upma', description: 'Tawa-roasted upma generously studded with tender malai paneer cubes and freshly crushed pepper.', price: 145, category: 'Upma', categoryCode: 'UPMA', image: '/images/paneer-upma.jpg', rating: 4.8, reviewsCount: 1140, isBestseller: false, isVeg: true, prepTime: 7, calories: 420, tags: ['Paneer', 'Protein Rich', 'Savory'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-U06', name: 'Butter Masala Upma', description: 'Upma cooked with spices and butter for a rich flavor.', price: 100, category: 'Upma', categoryCode: 'UPMA', image: '/images/butter-masala-upma.jpg', rating: 4.8, reviewsCount: 1390, isBestseller: true, isVeg: true, prepTime: 7, calories: 410, tags: ['Masala Upma', 'Spicy', 'Butter'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-U07', name: 'Paneer Cheese Upma', description: 'The ultimate royal upma — bursting with both fresh paneer cubes and overflowing molten cheese.', price: 165, category: 'Upma', categoryCode: 'UPMA', image: '/images/cheese-upma.jpg', rating: 4.9, reviewsCount: 1610, isBestseller: true, isVeg: true, prepTime: 8, calories: 530, tags: ['Paneer Cheese', 'Royal', 'Bestseller'], customizable: { butter: true, spice: true, extras: true } },
  { id: 'GD-U08', name: 'Schezwan Upma', description: 'Fluffy semolina upma wok-tossed in fiery schezwan sauce with diced carrots, green peas, roasted whole red chilies and spring onions, served in a turquoise ceramic bowl.', price: 135, category: 'Upma', categoryCode: 'UPMA', image: '/images/schezwan-upma.jpg', rating: 4.8, reviewsCount: 1180, isBestseller: true, isVeg: true, prepTime: 7, calories: 400, tags: ['Schezwan', 'Spicy', 'Fusion', 'Wok Tossed', 'Bestseller'], customizable: { butter: true, spice: true, extras: true } }
];

const orderStages = ['NEW', 'TAWA', 'PLATING', 'READY', 'SERVED'];

const orders = [
  { id: 'ORD-2841', customerName: 'Ramesh Iyer', customerPhone: '+91-98491-11223', items: [{ id: 'GD-D02', name: 'Govind Dosa', quantity: 2, price: 115, customizations: { butter: 'Extra', spice: 'Medium', extras: ['Cheese'] } }, { id: 'GD-I03', name: 'Tawa Idly', quantity: 1, price: 105, customizations: {} }], subtotal: 335, tax: 17, total: 352, stage: 'TAWA', status: 'preparing', orderType: 'Dine-In', tableNo: 'T-07', createdAt: new Date(Date.now() - 4 * 60 * 1000).toISOString(), estimatedTime: 8, assignedChef: 'Govind ji', notes: 'Extra butter please' },
  { id: 'ORD-2842', customerName: 'Priya Reddy', customerPhone: '+91-90000-55441', items: [{ id: 'GD-D05', name: 'Karam Dosa', quantity: 1, price: 95, customizations: { butter: 'Double', spice: 'Hot', extras: [] } }], subtotal: 95, tax: 5, total: 100, stage: 'READY', status: 'ready', orderType: 'Takeaway', tableNo: null, createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(), estimatedTime: 6, assignedChef: 'Suresh', notes: '' },
  { id: 'ORD-2843', customerName: 'Walk-in Customer', customerPhone: null, items: [{ id: 'GD-D16', name: 'Paneer Cheese Dosa', quantity: 1, price: 155, customizations: { butter: 'Regular', spice: 'Medium', extras: [] } }, { id: 'GD-U01', name: 'Tawa Upma', quantity: 1, price: 135, customizations: { butter: 'Regular', spice: 'Medium', extras: [] } }], subtotal: 290, tax: 15, total: 305, stage: 'PLATING', status: 'preparing', orderType: 'Dine-In', tableNo: 'T-03', createdAt: new Date(Date.now() - 7 * 60 * 1000).toISOString(), estimatedTime: 10, assignedChef: 'Mahesh', notes: '' }
];

const customers = [
  { id: 'CUST-001', name: 'Ramesh Iyer', phone: '+91-98491-11223', email: 'ramesh.iyer@gmail.com', segment: 'VIP', loyaltyPoints: 1840, totalOrders: 47, totalSpent: 12480, lastVisit: '2026-09-28', joinedOn: '2024-03-15' },
  { id: 'CUST-002', name: 'Priya Reddy', phone: '+91-90000-55441', email: 'priya.reddy@gmail.com', segment: 'Regular', loyaltyPoints: 620, totalOrders: 18, totalSpent: 4320, lastVisit: '2026-09-29', joinedOn: '2024-08-22' },
  { id: 'CUST-003', name: 'Asha Krishnan', phone: '+91-99492-88101', email: 'asha.k@hotmail.com', segment: 'VIP', loyaltyPoints: 2210, totalOrders: 62, totalSpent: 16840, lastVisit: '2026-09-30', joinedOn: '2023-11-08' },
  { id: 'CUST-004', name: 'Vikram Naidu', phone: '+91-98841-22019', email: 'vikram.naidu@gmail.com', segment: 'Regular', loyaltyPoints: 410, totalOrders: 12, totalSpent: 3120, lastVisit: '2026-09-26', joinedOn: '2025-02-14' },
  { id: 'CUST-005', name: 'Lakshmi Venkat', phone: '+91-91210-67382', email: 'lakshmivenkat@yahoo.com', segment: 'New', loyaltyPoints: 80, totalOrders: 2, totalSpent: 480, lastVisit: '2026-09-30', joinedOn: '2026-09-22' },
  { id: 'CUST-006', name: 'Karthik Subramaniam', phone: '+91-98401-11992', email: 'karthik.s@gmail.com', segment: 'VIP', loyaltyPoints: 3120, totalOrders: 88, totalSpent: 24560, lastVisit: '2026-09-30', joinedOn: '2023-05-19' }
];

const reservations = [
  { id: 'RES-101', name: 'Sundaram Family', phone: '+91-98491-33221', email: 'sundaram.r@gmail.com', partySize: 6, date: '2026-10-01', timeSlot: '19:30', tableNo: 'T-12', status: 'confirmed', notes: 'Birthday celebration' },
  { id: 'RES-102', name: 'Meenakshi', phone: '+91-90000-88141', email: 'meena.k@gmail.com', partySize: 2, date: '2026-10-01', timeSlot: '20:00', tableNo: 'T-05', status: 'confirmed', notes: '' },
  { id: 'RES-103', name: 'Anjali Rao', phone: '+91-99492-11203', email: 'anjali.rao@gmail.com', partySize: 4, date: '2026-10-02', timeSlot: '21:00', tableNo: 'T-09', status: 'pending', notes: 'Window seat preferred' }
];

const coupons = [
  { code: 'GOVIND1988', description: "Founder's Day 10% off", discountType: 'percentage', discountValue: 10, minOrder: 200, maxDiscount: 100, validTill: '2026-12-31', isActive: true },
  { code: 'AMUL50', description: 'Flat ₹50 off above ₹300', discountType: 'flat', discountValue: 50, minOrder: 300, maxDiscount: 50, validTill: '2026-10-31', isActive: true },
  { code: 'DOSA20', description: '20% off on butter specials', discountType: 'percentage', discountValue: 20, minOrder: 400, maxDiscount: 150, validTill: '2026-10-15', isActive: true },
  { code: 'WEEKEND15', description: 'Weekend special 15% off', discountType: 'percentage', discountValue: 15, minOrder: 250, maxDiscount: 80, validTill: '2026-10-31', isActive: true }
];

const crmLeads = [
  { id: 'LEAD-001', name: 'ITC Hotel Group', company: 'ITC Hotels', phone: '+91-98491-00001', email: 'procurement@itchotels.in', stage: 'Qualified / Hot Lead', dealValue: 85000, notes: 'Bulk catering for 3-day conference in HITEC City. 200 dosas/day required.', tags: ['Catering', 'B2B', 'High Value'], leadSource: 'Website Inquiry', assignedAgent: 'Kiran Patel (CRM Manager)', createdAt: '2026-09-20T10:30:00Z', lastActivity: '2026-09-29T14:20:00Z' },
  { id: 'LEAD-002', name: 'Rajesh Caterers', company: 'Rajesh Catering Services', phone: '+91-98491-00002', email: 'rajesh@caterershyd.com', stage: 'Negotiation / Quote Sent', dealValue: 32000, notes: 'Wedding catering — 400 guests. Needs custom South Indian menu.', tags: ['Catering', 'Wedding', 'B2B'], leadSource: 'Referral - Existing Customer', assignedAgent: 'Kiran Patel (CRM Manager)', createdAt: '2026-09-15T09:00:00Z', lastActivity: '2026-09-28T16:45:00Z' },
  { id: 'LEAD-003', name: 'Microsoft Hyderabad Campus', company: 'Microsoft India', phone: '+91-98491-00003', email: 'facilities@msindia.com', stage: 'Prospect / Inquiry', dealValue: 150000, notes: 'Quarterly employee event — food truck setup at Gachibowli campus.', tags: ['Corporate', 'Event', 'High Value'], leadSource: 'LinkedIn Outreach', assignedAgent: 'Venkatesh (Founder)', createdAt: '2026-09-25T11:15:00Z', lastActivity: '2026-09-25T11:15:00Z' },
  { id: 'LEAD-004', name: 'Swiggy Cloud Kitchen', company: 'Swiggy Access', phone: '+91-98491-00004', email: 'partners@swiggy.in', stage: 'Closed Won / Active', dealValue: 60000, notes: 'Cloud kitchen pilot at Madhapur — weekly supply of batter & chutneys started.', tags: ['Partnership', 'Recurring', 'B2B'], leadSource: 'Cold Outreach', assignedAgent: 'Kiran Patel (CRM Manager)', createdAt: '2026-08-12T13:30:00Z', lastActivity: '2026-09-30T09:00:00Z' },
  { id: 'LEAD-005', name: 'Local Family Inquiry', company: 'Individual Diner', phone: '+91-98491-00005', email: 'familyuser@gmail.com', stage: 'Prospect / Inquiry', dealValue: 4500, notes: 'Family function — 30 people. Inquiry for home-style catering package.', tags: ['Catering', 'B2C'], leadSource: 'Google Search', assignedAgent: 'Kiran Patel (CRM Manager)', createdAt: '2026-09-29T18:20:00Z', lastActivity: '2026-09-29T18:20:00Z' }
];

const campaigns = [];

export const store = {
  getMenu() { return [...menuItems]; },
  getMenuItem(id) { return menuItems.find(i => i.id === id) || null; },

  getOrders() { return [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); },
  getOrder(id) { return orders.find(o => o.id === id) || null; },

  createOrder(payload) {
    const { items, customerName = 'Walk-in Customer', customerPhone = null, orderType = 'Dine-In', tableNo = null, notes = '' } = payload;
    const subtotal = items.reduce((sum, it) => sum + (it.price * it.quantity), 0);
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax;
    const estimatedTime = Math.max(...items.map(it => (menuItems.find(m => m.id === it.id)?.prepTime || 8) * it.quantity), 5);
    const order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName, customerPhone, items, subtotal, tax, total,
      stage: 'NEW', status: 'received', orderType, tableNo,
      createdAt: new Date().toISOString(), estimatedTime,
      assignedChef: 'Govind ji', notes
    };
    orders.push(order);
    if (customerPhone) {
      const existingLead = crmLeads.find(l => l.phone === customerPhone);
      if (!existingLead) {
        this.addLead({ name: customerName, company: 'Individual Diner', phone: customerPhone, email: '', stage: 'Closed Won / Active', dealValue: total, notes: `Auto-logged from order ${order.id}`, tags: ['Walk-in', 'B2C'], leadSource: 'Storefront Order', assignedAgent: 'Kiran Patel (CRM Manager)' });
      }
    }
    return order;
  },

  updateOrderStatus(id, newStatus) {
    const order = orders.find(o => o.id === id);
    if (!order) return null;
    order.status = newStatus;
    if (newStatus === 'served') order.stage = 'SERVED';
    else if (newStatus === 'ready') order.stage = 'READY';
    return order;
  },

  updateOrderStage(id, action, targetStage) {
    const order = orders.find(o => o.id === id);
    if (!order) return null;
    const stages = ['NEW', 'TAWA', 'PLATING', 'READY', 'SERVED'];
    const currentIdx = stages.indexOf(order.stage);
    if (action === 'advance') {
      order.stage = stages[Math.min(currentIdx + 1, stages.length - 1)];
      if (order.stage === 'READY') order.status = 'ready';
      if (order.stage === 'SERVED') order.status = 'served';
    } else if (action === 'cancel') {
      order.stage = 'CANCELLED'; order.status = 'cancelled';
    } else if (action === 'reset') {
      order.stage = targetStage || 'NEW'; order.status = 'received';
    }
    return order;
  },

  getCustomers(segment, q) {
    let list = [...customers];
    if (segment && segment !== 'All') list = list.filter(c => c.segment.toLowerCase() === segment.toLowerCase());
    if (q) {
      const query = q.toLowerCase();
      list = list.filter(c => c.name.toLowerCase().includes(query) || c.phone.includes(query) || (c.email && c.email.toLowerCase().includes(query)));
    }
    return list;
  },

  getReservations() { return [...reservations].sort((a, b) => new Date(`${b.date}T${b.timeSlot}`) - new Date(`${a.date}T${a.timeSlot}`)); },
  createReservation(payload) {
    const reservation = { id: `RES-${Math.floor(100 + Math.random() * 900)}`, ...payload, tableNo: payload.tableNo || null, status: 'confirmed', notes: payload.notes || '' };
    reservations.push(reservation);
    return reservation;
  },

  getCoupons() { return coupons.filter(c => c.isActive); },
  validateCoupon(code, subtotal) {
    const coupon = coupons.find(c => c.code.toUpperCase() === (code || '').toUpperCase() && c.isActive);
    if (!coupon) return { valid: false, error: 'Invalid or expired coupon code' };
    if (subtotal < coupon.minOrder) return { valid: false, error: `Minimum order amount is ₹${coupon.minOrder}` };
    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = Math.round((subtotal * coupon.discountValue) / 100);
      discount = Math.min(discount, coupon.maxDiscount);
    } else { discount = coupon.discountValue; }
    return { valid: true, code: coupon.code, description: coupon.description, discountType: coupon.discountType, discount, finalTotal: subtotal - discount };
  },

  getDashboardAnalytics() {
    const today = new Date().toISOString().slice(0, 10);
    const todaysOrders = orders.filter(o => o.createdAt.startsWith(today));
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const todaysRevenue = todaysOrders.reduce((sum, o) => sum + o.total, 0);
    const itemSalesMap = {};
    orders.forEach(o => {
      o.items.forEach(it => {
        if (!itemSalesMap[it.id]) itemSalesMap[it.id] = { id: it.id, name: it.name, quantity: 0, revenue: 0 };
        itemSalesMap[it.id].quantity += it.quantity;
        itemSalesMap[it.id].revenue += it.price * it.quantity;
      });
    });
    const topItems = Object.values(itemSalesMap).sort((a, b) => b.quantity - a.quantity).slice(0, 5);
    return {
      kpis: {
        totalRevenue, todaysRevenue, totalOrders: orders.length,
        todaysOrders: todaysOrders.length, activeCustomers: customers.length,
        avgOrderValue: Math.round(totalRevenue / Math.max(orders.length, 1)),
        repeatCustomerRate: Math.round((customers.filter(c => c.totalOrders > 3).length / Math.max(customers.length, 1)) * 100)
      },
      topItems,
      orderStageBreakdown: orderStages.map(stage => ({ stage, count: orders.filter(o => o.stage === stage).length })),
      customerSegments: ['VIP', 'Regular', 'New'].map(seg => ({ segment: seg, count: customers.filter(c => c.segment === seg).length })),
      hourlyTrends: [{ hour: '7AM', orders: 12 }, { hour: '8AM', orders: 28 }, { hour: '9AM', orders: 35 }, { hour: '10AM', orders: 18 }, { hour: '11AM', orders: 8 }, { hour: '12PM', orders: 22 }, { hour: '1PM', orders: 31 }, { hour: '2PM', orders: 19 }, { hour: '6PM', orders: 24 }, { hour: '7PM', orders: 38 }, { hour: '8PM', orders: 41 }, { hour: '9PM', orders: 26 }]
    };
  },

  getCrmPipeline() { return [...crmLeads].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); },
  addLead(payload) {
    const lead = { id: `LEAD-${String(crmLeads.length + 1).padStart(3, '0')}`, ...payload, createdAt: new Date().toISOString(), lastActivity: new Date().toISOString() };
    crmLeads.unshift(lead);
    return lead;
  },
  updateLeadStage(id, newStage) {
    const lead = crmLeads.find(l => l.id === id);
    if (!lead) return null;
    lead.stage = newStage;
    lead.lastActivity = new Date().toISOString();
    return lead;
  },
  deleteLead(id) {
    const idx = crmLeads.findIndex(l => l.id === id);
    if (idx === -1) return false;
    crmLeads.splice(idx, 1);
    return true;
  },
  getAnalytics() {
    const totalPipelineValue = crmLeads.reduce((sum, l) => sum + l.dealValue, 0);
    const wonValue = crmLeads.filter(l => l.stage === 'Closed Won / Active').reduce((sum, l) => sum + l.dealValue, 0);
    const activeLeads = crmLeads.filter(l => !l.stage.includes('Closed')).length;
    const stageBreakdown = ['Prospect / Inquiry', 'Qualified / Hot Lead', 'Negotiation / Quote Sent', 'Closed Won / Active', 'Closed Lost / Archived'].map(stage => ({ stage, count: crmLeads.filter(l => l.stage === stage).length, value: crmLeads.filter(l => l.stage === stage).reduce((s, l) => s + l.dealValue, 0) }));
    return {
      kpis: { totalLeads: crmLeads.length, activeLeads, totalPipelineValue, wonValue, conversionRate: crmLeads.length ? Math.round((crmLeads.filter(l => l.stage === 'Closed Won / Active').length / crmLeads.length) * 100) : 0, avgDealValue: crmLeads.length ? Math.round(totalPipelineValue / crmLeads.length) : 0 },
      stageBreakdown,
      topAgents: [{ name: 'Kiran Patel (CRM Manager)', leads: crmLeads.filter(l => l.assignedAgent.includes('Kiran')).length, closed: crmLeads.filter(l => l.assignedAgent.includes('Kiran') && l.stage === 'Closed Won / Active').length }, { name: 'Venkatesh (Founder)', leads: crmLeads.filter(l => l.assignedAgent.includes('Venkatesh')).length, closed: crmLeads.filter(l => l.assignedAgent.includes('Venkatesh') && l.stage === 'Closed Won / Active').length }]
    };
  },
  triggerCampaign(payload) {
    const campaign = { id: generateId('CMP'), ...payload, sentAt: new Date().toISOString(), reach: payload.audience === 'All Customers' ? customers.length : customers.filter(c => c.segment === payload.audience).length, status: 'sent' };
    campaigns.push(campaign);
    return campaign;
  }
};
