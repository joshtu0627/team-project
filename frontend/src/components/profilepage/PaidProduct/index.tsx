import { Button } from "@mui/material";
import Divider from '@mui/material/Divider';
import { backendurl } from "../../../constants/urls";

interface PaidProductProps {
    id: number;
    name: string;
    color: string;
    size: string;
    qty: number;
    price: number;
}

const PaidProduct: React.FC<PaidProductProps> = (props) => {
    const {
        id,
        name,
        color,
        size,
        qty,
        price,
    } = props;
    return (
        <>
            <Divider variant="middle"/>
            <img
                className="flex flex-row"
                src={`${backendurl}/assets/${id}/main.jpg`}
                alt={name}
            />
            <div className="flex flex-row">
                <div className="flex flex-col">
                    <span>商品名稱：{name}</span>
                    <span>顏色：{color}</span>
                    <span>尺寸：{size}</span>
                    <span>數量：{qty}</span>
                </div>
                <div className="flex flex-col">
                    <span>單價：{price}</span>
                    <span>總價：{qty * price}</span>
                </div>
                <Button variant="contained">去評價</Button>
            </div>
        </>
    );
};

export default PaidProduct;