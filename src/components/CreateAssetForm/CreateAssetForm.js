import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Steps from "./Steps";
import Review from "./Review";
import Review2 from "./Review2";
import {createAssetStore} from "./CreateAssetStore";
import ConfirmationModal from "../Modal/ConfirmationModal";
import CreateAssetModal from "../Modal/CreateAssetModal";
import * as api from "../../utils/Api";
import SuccessModal from "../Modal/SuccessModal";


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['General Information', 'Review'];
}

function getStepContent(step) {
  switch (step) {
    case 0:return <Steps step="step1"/>;
    case 1:return <Review2/>;
    default:
      return 'Unknown step';
  }
}

export default function HorizontalNonLinearAlternativeLabelStepper() {
  const classes = useStyles();
  const [showModal, setShowModal] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set());
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const totalSteps = () => {
    return getSteps().length;
  };

  const isStepOptional = step => {
    return step === 9;
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const toggleModal = () => {
    if (showModal) {
      setShowModal(false)
    } else {
      setShowModal(true)
    }
  }

  const skippedSteps = () => {
    return skipped.size;
  };

  const completedSteps = () => {
    return completed.size;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps() - skippedSteps();
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    // let currentStep = createAssetStore.currentStep;
    // for (var i in createAssetStore[currentStep]) {
    //   if (createAssetStore[currentStep][i.toString()].value === '') {
    //     setPageIncomplete(currentStep);
    //   }
    // }

    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed
          // find the first step that has been completed
        steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStep = step => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    setCompleted(newCompleted);

    /**
     * Sigh... it would be much nicer to replace the following if conditional with
     * `if (!this.allStepsComplete())` however state is not set when we do this,
     * thus we have to resort to not being very DRY.
     */
    if (completed.size !== totalSteps() - skippedSteps()) {
      handleNext();
    }
  };

  const submitData = () => {
    createAssetStore.submitData();
  }

  const handleReset = () => {
    setActiveStep(0);
    setCompleted(new Set());
    setSkipped(new Set());
  };

  function issueAsset() {
    const info =createAssetStore.generateInfo();
    api.createAsset(info)
      .then(data => {
        console.log(data)
        if (data.status === 200) {
          toggleModal()
        }
      })
      .catch(error => { console.log(error); })
  }

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  function isStepComplete(step) {
    return completed.has(step);
  }

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const buttonProps = {};
          if (isStepOptional(index)) {
            buttonProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepButton
                onClick={handleStep(index)}
                completed={isStepComplete(index)}
                {...buttonProps}
              >
                {label}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div>
            <Typography
              className={classes.instructions}
              component={'span'}
            >
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography
              className={classes.instructions}
              component={'span'}
            >
              {getStepContent(activeStep)}
            </Typography>
            <div style={{padding: '20px'}}></div>
            <div style = {{ textAlign: 'center'}}>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                disabled={activeStep === 1}
              >
                Next
              </Button>
              {activeStep === 1 ?
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => issueAsset()}
                >
                  Submit
                </Button>
                : ''
                }
              {/*{isStepOptional(activeStep) && !completed.has(activeStep) && (*/}
                {/*<Button*/}
                  {/*variant="contained"*/}
                  {/*color="primary"*/}
                  {/*onClick={handleSkip}*/}
                  {/*className={classes.button}*/}
                {/*>*/}
                  {/*Skip*/}
                {/*</Button>*/}
              {/*)}*/}

              {/*{activeStep !== steps.length &&*/}
              {/*(completed.has(activeStep) ? (*/}
                {/*<Typography variant="caption" className={classes.completed}>*/}
                  {/*Step {activeStep + 1} already completed*/}
                {/*</Typography>*/}
              {/*) : (*/}
                {/*<Button variant="contained" color="primary" onClick={handleComplete}>*/}
                  {/*{completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}*/}
                {/*</Button>*/}
              {/*))}*/}
            </div>
          </div>
        )}
      </div>
      <div style={{padding: '20px'}}></div>
      <SuccessModal
        modalHeader="Success"
        showOrHideModal={toggleModal}
        show={showModal}
        // modalData={this.modalBody()}
      />
    </div>
  );
}
