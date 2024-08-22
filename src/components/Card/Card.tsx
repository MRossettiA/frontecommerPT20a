import React from "react";
import CardProps from "./type";

export const Card: React.FC<CardProps> = ({
  name,
  price,
  image,
  stock,
  categoryId,
}) => {
  return (
    <div className="flex flex-col bg-gray-700 p-4 rounded-md max-w-sm mx-auto">
      <div className="relative w-full h-48 overflow-hidden rounded-md">
        <img
          src={image}
          alt={`Imagen del producto ${name}`}
          className="w-full h-full object-cover"
          style={{ objectFit: 'contain' }} // Ajusta la imagen sin recortar
        />
      </div>
      <div className="mt-4">
        <h2 className="text-white font-bold">{name}</h2>
        <h2 className="text-white">${price}</h2>
        <p className="text-white bg-cyan-900 rounded-full text-center">Stock: {stock}</p>
      </div>
    </div>
  );
};

export default Card;
