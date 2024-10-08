import React, { useContext, useState } from 'react';
import './ProductSingleCard.css';
import { useCart } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';

const ProductSingleCard = ({ product }) => {
  const { addToCart, removeFromCart, cartItems } = useCart();
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemInCart = cartItems.find(item => item._id === product._id);
  const quantity = itemInCart ? itemInCart.quantity : 0;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product._id);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="product-card">
        <figure className="product-image-container">
          <img src={product.image} alt={product.name} className="product-image" />
          <div className="product-overlay" onClick={handleModalOpen}>
            <span className="product-overlay-text">View Details</span>
          </div>
        </figure>
        <div className="product-card-body">
          <h2 className="product-card-title">{product.name}</h2>
          <div className="product-price">BDT {(product.priceInCents ).toFixed(2)}</div>
          <div className="product-card-actions">
            {user.isLoggedIn && (
              <>
                {quantity > 0 ? (
                  <button className="product-btn product-btn-error" onClick={handleRemoveFromCart}>
                    Remove from Cart
                  </button>
                ) : (
                  <button className="product-btn product-btn-primary" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="product-modal-overlay" onClick={handleModalClose}>
          <div className="product-modal-content">
            <span className="product-modal-close" onClick={handleModalClose}>&times;</span>
            <img src={product.image} alt={product.name} className="product-modal-image" />
            <h2>{product.name}</h2>
            <p>{product.description || 'No description available.'}</p>
            <div className="product-price">BDT {(product.priceInCents).toFixed(2)}</div>
            <div className="product-modal-actions">
              {user.isLoggedIn && (
                <>
                  {quantity > 0 ? (
                    <button className="product-btn product-btn-error" onClick={handleRemoveFromCart}>
                      Remove from Cart
                    </button>
                  ) : (
                    <button className="product-btn product-btn-primary" onClick={handleAddToCart}>
                      Add to Cart
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductSingleCard;
