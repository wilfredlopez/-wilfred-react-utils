export class BiNode<T extends any = any> {
  constructor(
    public value: T,
    public next: BiNode | null = null,
    public previous: BiNode | null = null,
  ) {}
}
