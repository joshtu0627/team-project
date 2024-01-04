import React, { useEffect } from "react"
import { backendurl } from "../../../constants/urls";
import axios from "axios";
import PaidProduct from "../PaidProduct"
import { parseCookies } from 'nookies';

interface OrderProps {
    id: number;
    details: {
        list: {
            id: number;
            qty: number;
            size: string;
            color: {
                code: string;
                name: string;
            };
            price: number;
            title: string;
            is_reviewed: number;
        }[];
    }
    total: number;
}

export default function PaidOrders () {
    const [orders, setOrders] = React.useState<OrderProps[]>([]);
    const { user_id } = parseCookies();

    useEffect(() => {
        const fetchOrders = async () => {
            // remember to change the user id
            const res = await axios.get(`${backendurl}/api/1.0/order/user/${user_id}`);
            setOrders(res.data.data);
        }

        fetchOrders();
    }, []);

    return (
        <div className="w-2/3">
            {orders.map(({ id, details, total }) => {
                const order_id = id;
                return (
                    <div className="border rounded-xl p-8 w-full mt-8 flex flex-col">
                        <p className="font-bold text-2xl mb-4">訂單編號：{id}</p>
                        {details.list.map(({ id, qty, size, color, price, title, is_reviewed }) => {
                            return (
                                <PaidProduct 
                                    order_id={order_id}
                                    key={id}
                                    id={id}
                                    name={title}
                                    color={color.name}
                                    color_code={color.code}
                                    size={size}
                                    qty={qty}
                                    price={price}
                                    is_reviewed={is_reviewed}
                                />
                            )
                        })}
                        <hr />
                        <p className="font-bold text-2xl mt-4 self-end">總金額：{total}</p>
                    </div>
                )
            })}
        </div>
    )
}; 