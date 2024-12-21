import React from "react";

const DrinksPage = () => {
  const drinks = [
    { id: 1, name: "Red Wine", description: "A full-bodied red wine with rich flavors.", price: "$15" },
    { id: 2, name: "White Wine", description: "A crisp and refreshing white wine.", price: "$12" },
    { id: 3, name: "Beer", description: "Cold and refreshing beer, perfect for any occasion.", price: "$5" },
    { id: 4, name: "Whiskey", description: "Smooth and smoky whiskey for the discerning drinker.", price: "$25" },
    { id: 5, name: "Cocktail", description: "A refreshing cocktail mixed to perfection.", price: "$8" }
  ];

  return (
    <div>
      {/* Half Background Section */}
      <div
        className="relative w-full h-[400px] object-cover bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1500217052183-bc01eee1a74e?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-white text-left px-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-200">Genuine wines, spirits, & beers direct to your door.</h1>
            <p className="text-lg mt-4">⚡⚡ Get your drinks delivered for just 80 ETB flat! ⚡⚡</p>
          </div>
        </div>
      </div>

      {/* Drink List Section */}
      <div className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">Available Drinks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {drinks.map((drink) => (
              <div key={drink.id} className="border rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800">{drink.name}</h3>
                <p className="text-gray-600 mt-2">{drink.description}</p>
                <p className="text-lg font-bold text-blue-500 mt-4">{drink.price}</p>
                <button className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinksPage;
