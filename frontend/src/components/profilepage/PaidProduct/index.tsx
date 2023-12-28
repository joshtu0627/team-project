import { Button } from "@mui/material";
import Divider from '@mui/material/Divider';

interface PaidProductProps {
    name: string;
    color: string;
    size: string;
    qty: number;
    price: number;
}

const PaidProduct: React.FC<PaidProductProps> = (props) => {
    const {
        name,
        color,
        size,
        qty,
        price,
    } = props;
    return (
        <>
            <Divider variant="middle"/>
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