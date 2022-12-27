export type Styles = {
  file: string;
  file2: string;
  home: string;
  medal: string;
  sns_facebook: string;
  sns_facebook2: string;
  sns_instagram: string;
  sns_line: string;
  sns_line2: string;
  sns_line3: string;
  sns_line4: string;
  sns_twitter: string;
  upload: string;
  upload2: string;
  'user-circle': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
