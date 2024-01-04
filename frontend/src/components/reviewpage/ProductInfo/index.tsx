import React from "react";

interface ProductInfoProps {
    name: string;
    size: string;
    color: string;
}

const ProductInfo: React.FC<ProductInfoProps> = (props) => {
    const { name, size, color } = props;
    return (
        <div className="flex flex-col">
            <span>品項：{name}</span>
            <span>規格：{size}</span>
            <span>顏色：{color}</span>
        </div>
    )
};

export default ProductInfo;