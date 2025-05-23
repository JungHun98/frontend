import { NONE_SELECT } from '../../../review/_constants/info';
import type { SingleFunnelData, Step } from '../../_types/funnel';
import styles from './SingleSectionStep.module.scss';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import ButtonContainer from '@/components/ButtonContainer/ButtonContainer';
import Highlight from '@/components/Highlight/Highlight';
import PageExplanation from '@/components/PageExplanation';
import Spacing from '@/components/Spacing/Spacing';
import StageView from '@/components/StageView';

interface SingleSectionStepProps {
  stadiumId: number;
  setStep: (step: Step) => void;
  data: Partial<SingleFunnelData>;
  setData: React.Dispatch<React.SetStateAction<Partial<SingleFunnelData>>>;
}

const SingleSectionStep = ({ stadiumId, setStep, data, setData }: SingleSectionStepProps) => {
  const router = useRouter();

  return (
    <>
      <div className={styles.singleSectionStepLayout}>
        <div className={styles.pageExplanationContainer}>
          <PageExplanation>
            <PageExplanation.Title>
              시야를 확인할
              <br />
              <Highlight>구역</Highlight>을 선택해주세요
            </PageExplanation.Title>
            <PageExplanation.Subtitle>손가락으로 좌석표를 확대해보세요</PageExplanation.Subtitle>
          </PageExplanation>
        </div>

        <Spacing size={32} />

        <div className={styles.stageViewContainer}>
          <StageView
            stadiumId={stadiumId}
            selectedSectionId={data.sectionId ?? null}
            onSelectSection={(info) => {
              setData(() => ({
                sectionId: info.sectionId,
                sectionName: info.sectionName,
                seatingId: info.sectionName.includes('floor') ? info.sectionId : 0,
              }));
            }}
          />
        </div>
      </div>

      <Spacing size={40} />

      <div className={styles.buttonContainer}>
        <ButtonContainer>
          <Button variant="secondary" onClick={() => router.push(`/home/${stadiumId}`)}>
            이전
          </Button>
          <Button
            variant={data.sectionId !== NONE_SELECT ? 'primary' : 'inactive'}
            disabled={!data.sectionId}
            onClick={() => {
              if (!data.sectionName) return;

              if (data.sectionName.includes('floor')) {
                router.push(`/home/${stadiumId}/single/${data.seatingId}`);
              } else {
                setStep('Seating');
              }
            }}
          >
            다음
          </Button>
        </ButtonContainer>
      </div>
    </>
  );
};

export default SingleSectionStep;
