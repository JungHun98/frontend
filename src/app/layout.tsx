import styles from './page.module.scss';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import ErrorCapture from '@/components/ErrorCapture';
import KakaoScript from '@/components/KakaoScript';
import { auth } from '@/auth';
import { AuthProvider } from '@/providers/AuthProvider';
import { ErrorProvider } from '@/providers/ErrorProvider';
import { PopupProvider } from '@/providers/PopupProvider';
import QueryProvider from '@/providers/QueryProvider';
import { ToastProvider } from '@/providers/ToastProvider';
import '@/styles/global.scss';
import { getMetadata } from '@/utils/getMetadata';

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
  preload: true,
});

export const metadata: Metadata = getMetadata();

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const session = await auth();

  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        <ErrorProvider>
          <QueryProvider>
            <ToastProvider>
              <PopupProvider>
                <AuthProvider session={session}>
                  <ErrorCapture />
                  <div className={styles.layout}>
                    {children}
                    <div id="portal"></div>
                  </div>
                </AuthProvider>
              </PopupProvider>
            </ToastProvider>
          </QueryProvider>
        </ErrorProvider>
      </body>
      <KakaoScript />
    </html>
  );
};

export default RootLayout;
