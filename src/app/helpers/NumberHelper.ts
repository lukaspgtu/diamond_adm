export class NumberHelper {

    public static formatMoney(value: number) {
        return Intl.NumberFormat('pt-BR').format(value);
    }
}
