import { Button } from "@mui/material";
import Divider from '@mui/material/Divider';
import { backendurl } from "../../../constants/urls";
import { Link } from "react-router-dom";

interface PaidProductProps {
    order_id: number;
    id: number;
    name: string;
    color: string;
    size: string;
    qty: number;
    price: number;
    color_code: string;
    is_reviewed: number;
}

const PaidProduct: React.FC<PaidProductProps> = (props) => {
    const {
        order_id,
        id,
        name,
        color,
        size,
        qty,
        price,
        color_code,
        is_reviewed
    } = props;

    const renderButton = () => {
        if (is_reviewed === 1) {
            return (
                <button className="bg-gray-300 px-4 py-2 rounded-3xl absolute right-0 bottom-0" disabled>
                    已評價
                </button>
            );
        } else {
            return (
                <button className="bg-yellow-400 px-4 py-2 rounded-3xl absolute right-0 bottom-0">
                    <Link
                        to="/review"
                        state={{
                            productId: id,
                            productName: name,
                            productSize: size,
                            productColor: color,
                            productColorCode: color_code,
                            orderId: order_id,
                        }}
                    >
                        去評價
                    </Link>
                </button>
            );
        }
    }
    return (
        <div className="mb-8 relative">
            <hr />
            <div className="flex flex-row gap-8 mt-8">
                <img
                    className="w-40"
                    src={`${backendurl}/assets/${id}/main.jpg`}
                    alt={name}
                />
                <div className="grid grid-cols-4 gap-12">
                    <div className="grid grid-rows-4  col-span-2">
                        <span>商品名稱：{name}</span>
                        <span>顏色：{color}</span>
                        <span>尺寸：{size}</span>
                        <span>數量：{qty}</span>
                    </div>
                    <div className="grid grid-rows-4">
                        <span>單價：{price}</span>
                        <span>總價：{qty * price}</span>
                    </div>
                    
                </div>
                {/* <button
                    className="bg-yellow-400 px-4 py-2 rounded-3xl absolute right-0 bottom-0"

                >
                    <Link
                        to="/review"
                        state={{
                            productId: id,
                            productName: name,
                            productSize: size,
                            productColor: color,
                            productColorCode: color_code,
                        }}
                    >
                        去評價
                    </Link>
                </button> */}
                {renderButton()}
            </div>
            
        </div>
    );
};

export default PaidProduct;