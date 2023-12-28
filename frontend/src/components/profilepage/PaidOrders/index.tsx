import React, { useEffect, useState } from "react"
import { backendurl } from "../../../constants/urls";
import axios from "axios";
import PaidProduct from "../PaidProduct"
import Divider from '@mui/material/Divider';

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
        }[];
    }
    total: number;
}

export default function PaidOrders () {
    const [orders, setOrders] = React.useState<OrderProps[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            // remember to change the user id
            const res = await axios.get(`${backendurl}/api/1.0/order/user/${1}`);
            setOrders(res.data.data);
        }

        fetchOrders();
    }, []);

    return (
        <div>
            {orders.map(({ id, details, total }) => {
                return (
                    <>
                        <p>訂單編號：{id}</p>
                        {details.list.map(({ id, qty, size, color, price }) => {
                            return (
                                <>
                                    <PaidProduct 
                                        key={id}
                                        id={id}
                                        name={`test`}
                                        color={color.name}
                                        size={size}
                                        qty={qty}
                                        price={price}
                                    />
                                </>
                            )
                        })}
                        <Divider variant="middle"/>
                        <p>總金額：{total}</p>
                    </>
                )
            })}
        </div>
    )
}; 