export interface Site {
  name: string;
  url: string;
  children?: Site[];
}
