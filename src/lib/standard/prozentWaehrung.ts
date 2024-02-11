
/**
 * Gibt den Wert als Prozent zurück
 * @param gw - Grundwert
 * @param gwg - Grundwert als bruch (z.B. 1.19 oder 1.0)
 * @param ag - Ausgabe wert (z.B. 0.19 oder 1.0)
 * @returns gw / gwg * ag aber mit 2 Nachkommastellen
 */
function prozentWaehrung(gw: number, gwg: number, ag: number): number {
    return Math.round((gw / gwg * ag) * 100) / 100;
}

export default prozentWaehrung;