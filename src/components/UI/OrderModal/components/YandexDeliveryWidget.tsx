import { useEffect } from "react";

export type DeliveryPoint = {
    id: string;
    address: string;
    price: number;
};

declare global {
    interface Window {
        YaDelivery?: {
            createWidget: (config: any) => void;
        };
    }
}

type Props = {
    onSelect: (point: DeliveryPoint) => void;
};

const DEFAULT_DELIVERY_PRICE = 320;

export const YandexDeliveryWidget: React.FC<Props> = ({ onSelect }) => {
    useEffect(() => {
        const startWidget = () => {
            if (!window.YaDelivery) return;

            window.YaDelivery.createWidget({
                containerId: "delivery-widget",
                params: {
                    city: "Казань",
                    size: {
                        height: "450px",
                        width: "100%",
                    },
                    delivery_price: "от 100 руб",
                    delivery_term: "от 1 дня",

                    physical_dims_weight_gross: 10000,
                    physical_dims: {
                        length: 40,
                        width: 30,
                        height: 10,
                    },

                    show_select_button: true,

                    filter: {
                        type: ["pickup_point", "terminal"],
                        is_yandex_branded: false,
                        payment_methods: ["already_paid", "card_on_receipt"],
                        payment_methods_filter: "or",
                    },
                },
            });
        };

        // подключаем скрипт, если его ещё нет
        if (
            !document.querySelector(
                'script[src="https://ndd-widget.landpro.site/widget.js"]'
            )
        ) {
            const script = document.createElement("script");
            script.src = "https://ndd-widget.landpro.site/widget.js";
            script.async = true;
            document.body.appendChild(script);
        }

        if (window.YaDelivery) {
            startWidget();
        } else {
            document.addEventListener("YaNddWidgetLoad", startWidget);
        }

        const onPointSelected = (event: Event) => {
            const e = event as CustomEvent<any>;

            const address =
                e.detail?.address?.full_address ?? "";

            const calculatedPrice =
                e.detail?.offer?.price ??
                e.detail?.offers?.[0]?.price ??
                e.detail?.tariffs?.[0]?.price ??
                0;

            onSelect({
                id: e.detail.id,
                address,
                price:
                    calculatedPrice > 0
                        ? calculatedPrice
                        : DEFAULT_DELIVERY_PRICE,
            });
        };

        document.addEventListener(
            "YaNddWidgetPointSelected",
            onPointSelected
        );

        return () => {
            document.removeEventListener(
                "YaNddWidgetLoad",
                startWidget
            );
            document.removeEventListener(
                "YaNddWidgetPointSelected",
                onPointSelected
            );
        };
    }, [onSelect]);

    return <div id="delivery-widget" />;
};
