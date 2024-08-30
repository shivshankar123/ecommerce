import React from "react";
import { Link } from "react-router-dom";

interface BookCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, image, price }) => {
  return (
    <div className="border p-4 rounded">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover mb-2"
        />
      </Link>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-gray-500">Price: ${price}</p>
    </div>
  );
};

export default BookCard;
