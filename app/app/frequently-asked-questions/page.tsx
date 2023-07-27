import PaddingContainer from "@/ui/Shared/PaddingContainer";

export interface IFrequentlyAskedQuestionsProps {}

export default function FrequentlyAskedQuestions(
  props: IFrequentlyAskedQuestionsProps,
) {
  return (
    <PaddingContainer withBottomGap>
      <h1>Frequently Asked Questions</h1>
      <hr />
      <h3>Is the website finished?</h3>
      <p>
        No, but I'm working on it! :D
        <br />
        <br />
        Be aware that there sometimes are database resets until release.
      </p>
      <hr />
      <h3>What will be in the initial release?</h3>
      <p>
        Functioning timesheets. Everything that won't be in release has the WIP
        badge next to it.
      </p>
      <hr />
      <h3>When will we be able to add a cost per hour to our timesheets?</h3>
      <p>After I've implemented functioning timesheets.</p>
    </PaddingContainer>
  );
}
