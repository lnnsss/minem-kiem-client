import type {
    CdekSelectedAddress,
    CdekSelectedDeliveryMode,
    CdekSelectedTariff,
} from "../../../../../types";
import { ensureCdekWidgetReady } from "../../../../../utils/cdekWidgetLoader";
import { useEffect, useRef, useState } from "react";

type Props = {
    onSelect: (address: string, code: string, price: number) => void;
};

export const Cdek = ({ onSelect }: Props) => {
    const [widgetReady, setWidgetReady] = useState(false);

    const widgetInitializedRef = useRef(false);
    const isMountedRef = useRef(true);

    const [userLocation, setUserLocation] = useState<[number, number] | null>(
        null,
    );

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        getUserLocation()
            .then((position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation([longitude, latitude]);
            })
            .catch(() => {
                setUserLocation([37.617664, 55.752121]);
            });
    }, []);

    useEffect(() => {
        if (!userLocation || widgetInitializedRef.current) return;

        let cancelled = false;

        const servicePath =
            import.meta.env.VITE_CDEK_SERVICE_PATH?.trim() || `/cdek-service`;

        (async () => {
            await ensureCdekWidgetReady();
            if (cancelled) return;
            if (!window.CDEKWidget) return;

            new window.CDEKWidget({
                from: {
                    country_code: "RU",
                    city: "Казань",
                    postal_code: 420111,
                    code: 1100,
                    address: "ул. Сибирский Тракт, 23",
                },
                canChoose: true,
                hideFilters: {
                    have_cashless: false,
                    have_cash: false,
                    is_dressing_room: false,
                    type: false,
                },
                hideDeliveryOptions: {
                    office: false,
                    door: true,
                },
                defaultLocation: userLocation,
                goods: [
                    {
                        width: 20,
                        height: 10,
                        length: 20,
                        weight: 0.5,
                    },
                ],
                root: "cdek-map",
                apiKey: import.meta.env.VITE_YANDEX_MAPS_API_KEY,
                servicePath,
                lang: "rus",
                currency: "RUB",
                tariffs: {
                    office: [234, 136],
                },
                onReady() {
                    if (!isMountedRef.current) return;
                    setWidgetReady(true);
                },
                onChoose(
                    mode: CdekSelectedDeliveryMode,
                    tariff: CdekSelectedTariff,
                    office: CdekSelectedAddress,
                ) {
                    const address = `${office.city}, ${office.address}`.trim();
                    const cdek_pvz_code = office.code;
                    const tariffType = mode === "office" ? "self_pickup" : "time_interval";
                    const price = tariff.delivery_sum;

                    console.log({
                        address,          // строка с городом
                        cdek_pvz_code,    // код ПВЗ
                        tariff: tariffType,
                        price,            // стоимость доставки
                    });

                    // если нужно — вызываем onSelect
                    onSelect(address, cdek_pvz_code, price);
                },
            });

            widgetInitializedRef.current = true;
        })();

        return () => {
            cancelled = true;
        };
    }, [userLocation, onSelect]);

    return (
        <div className="h-full relative flex flex-col">
            <div id="cdek-map" style={{ width: "100%", height: "600px" }} />

            {!widgetReady && <WidgetLoadingState />}
        </div>
    );
};

const WidgetLoadingState = () => {
    return (
        <div className="h-full flex items-center justify-center">
            Загрузка...
        </div>
    );
};

const getUserLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
            reject(new Error("Geolocation is not supported"));
        }
    });
};