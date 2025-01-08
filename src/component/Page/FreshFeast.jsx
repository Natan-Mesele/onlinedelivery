import React from "react";
import { Link } from "react-router-dom"; 

const FreshFeast = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header Section with Background Image */}
            <header className="bg-cover bg-center text-white py-24" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1735835590801-6b05b8d372d5?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
                <div className="max-w-7xl mx-auto text-center px-6">
                    <h1 className="text-5xl font-bold">Welcome to FreshFeast!</h1>
                    <p className="mt-4 text-xl max-w-3xl mx-auto">Your go-to platform for fresh, delicious meals delivered right to your doorstep!</p>
                    <Link to="/menu" className="mt-8 inline-block bg-white text-green-600 py-3 px-8 rounded-lg shadow-md hover:bg-gray-100">
                        Browse Menu
                    </Link>
                </div>
            </header>

            {/* Main Content Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-semibold mb-8">How It Works</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                            <h3 className="text-xl font-semibold">Browse Our Menu</h3>
                            <p className="mt-4">Explore a wide range of food options from local restaurants.</p>
                        </div>
                        {/* Step 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                            <h3 className="text-xl font-semibold">Place Your Order</h3>
                            <p className="mt-4">Add your favorite items to the cart and proceed to checkout.</p>
                        </div>
                        {/* Step 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                            <h3 className="text-xl font-semibold">Get It Delivered</h3>
                            <p className="mt-4">Our delivery team will bring your food right to your door.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Restaurants Section */}
            <section className="bg-gray-200 py-16">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-semibold mb-8">Featured Restaurants</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Restaurant Card */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                            <h3 className="text-xl font-semibold">Restaurant A</h3>
                            <p className="mt-4">Fresh salads and healthy options for every taste.</p>
                            <Link to="/menu" className="text-green-600 mt-4 inline-block">View Menu</Link>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                            <h3 className="text-xl font-semibold">Restaurant B</h3>
                            <p className="mt-4">Classic Italian dishes with a twist.</p>
                            <Link to="/menu" className="text-green-600 mt-4 inline-block">View Menu</Link>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                            <h3 className="text-xl font-semibold">Restaurant C</h3>
                            <p className="mt-4">Delicious burgers and comfort food.</p>
                            <Link to="/menu" className="text-green-600 mt-4 inline-block">View Menu</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="bg-green-600 text-white py-16">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-semibold">Ready to Order?</h2>
                    <p className="mt-4 text-xl">Start exploring our menus and place your order today!</p>
                    <Link to="/menu" className="mt-8 inline-block bg-white text-green-600 py-3 px-8 rounded-lg shadow-md hover:bg-gray-100">
                        Browse Menu
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default FreshFeast;
