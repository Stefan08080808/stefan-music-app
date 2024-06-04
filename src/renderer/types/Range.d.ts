/**
 * Type that represents a range of numbers from 0 to 100
 */
export type Range<N extends number, A extends number[] = []> = A['length'] extends N ? A[number] : Range<N, [...A, A['length']]>
export type Range0To100 = Range<100>