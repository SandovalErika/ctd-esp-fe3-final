export enum TEXT_BUTTON {
    ATRAS = "Atras",
    SIGUIENTE = "Siguiente",
    COMPRAR = "Comprar",
    DETALLE = "Ver detalle",
    SIN_STOCK = "Sin Stock",
    VOLVER_A_INICIO = "Volver a inicio"
}

export enum TEXT_INFORMATION_CARD {
    PRECIO_NUEVO = "Precio nuevo",
    PRECIO_ANTERIOR = "Precio anterior",
    PERSONAJES = "Personajes"
}

export enum TEXT_INFORMATION_COMIC {
    DESCRIPTION = "Descripcion",
    NOMBRE = "Comic: ",
    IMPORTE = "Importe pagado: ",
}

export enum TITLE_STEPPER {
    DATOS_PERSONALES = "Datos Personales,",
    DIRECCION_DE_ENTREGA = "Dirección de Entrega",
    DATOS_DEL_PAGO = "Datos del Pago"
}

export enum TEXT_PURCHASE {
    PURCHASE_CONFIRMATION = "Que disfrutes tu compra!",
}

export const REGEX = {
    extractIdFromURL: /characters\/(\d+)/
}