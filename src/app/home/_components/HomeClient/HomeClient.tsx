'use client';

import HomeNavigation from '../HomeNavigation';
import StadiumNavigation from '../StadiumNavigation';
import styles from './HomeClient.module.scss';
import { useFetchStadiumList } from '@/hooks/queries/useFetchStadium';
import Highlight from '@/components/Highlight/Highlight';
import Icon from '@/components/Icon/Icon';
import PageExplanation from '@/components/PageExplanation';
import Spacing from '@/components/Spacing/Spacing';

const HomeClient = () => {
  const { data } = useFetchStadiumList();

  return (
    <div className={styles.homeLayout}>
      <HomeNavigation />

      <Spacing size={49} />

      <main className={styles.homeMain}>
        <PageExplanation>
          <PageExplanation.Title>
            시야를 확인할
            <br />
            <Highlight>공연장</Highlight>을 선택해주세요
          </PageExplanation.Title>
          <PageExplanation.Subtitle>
            <Icon icon="IcChat" />
            후기 +{data?.data.totalReviewCount}개
          </PageExplanation.Subtitle>
        </PageExplanation>

        <StadiumNavigation navigationType="active" data={data?.data.active} />
        <StadiumNavigation navigationType="inactive" data={data?.data.inactive} />
      </main>
    </div>
  );
};

export default HomeClient;
