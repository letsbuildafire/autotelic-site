import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme, ThemeVariant } from '../../theme';

// helpers
import { TimelineLite } from 'gsap';

// components
import { Field, FieldProps } from 'formik';
import { FieldFeedback } from './FieldFeedback';
import { Label } from './Label';

type Props = {
  readonly className?: string,
  readonly display?: (value: number) => string,
  readonly format?: (value: number) => number,
  readonly label?: string,
  readonly max: number,
  readonly min: number,
  readonly theme?: Theme,
  readonly unit?: string,
  readonly variant?: ThemeVariant,
} & React.InputHTMLAttributes<HTMLInputElement>;

type PropsWithContext = Props & FieldProps<any>;

const style = ({ field, ...props }: Partial<PropsWithContext>) => css`
  position: relative;
  margin-bottom: 0.75rem;
  padding-top: 1rem;

  color: ${props.theme.color[props.variant].heading};
`;

const valueStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  color: inherit;

  margin: 3rem 0;
`;

const digitsStyle = css`
  position: relative;
  overflow: visible;
`;

const digitStyle = css`
  z-index: 1;
  display: block;
  margin-right: 0.5rem;

  font-size: 8rem;
  font-weight: bold;
  line-height: 0.9;

  transform-origin: center right;

  &:last-child {
    position: absolute;

    top: 0;
    left: 0;
  }
`;

const unitStyle = css`
  display: block;
`;

const sliderStyle = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  align-items: center;
  justify-content: center;

  position: relative;
`;

const ruleStyle = css`
  display: flex;
  width: 100%;

  flex: 0 0 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const tickStyle = css`
  position: relative;
  width: 1.5rem;
  margin: 0 1.5rem;

  text-align: center;

  display: inline-flex;
  padding-bottom: 0.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  transform-origin: bottom center;
  will-change: transform;

  &:before {
    content: attr(data-label);
    font-weight: bold;
    text-wrap: nowrap;
    text-align: center;

    transition: transform 100ms ease-out;
  }

  &:after {
    content: '';
    background: currentColor;

    display: block;
    width: 1px;
    height: 0.25rem;

    margin: 0 auto;
  }
`;

const minValueStyle = css`
  ${tickStyle}
`;

const midValueStyle = css`
  ${tickStyle}
`;

const maxValueStyle = css`
  ${tickStyle}
`;

const inputStyle = (props: Partial<PropsWithContext>) => css`
  -webkit-appearance: none;
  width: 100%;
  margin: 0px 0;
  height: 2.5rem;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    background: #3071a9;
    border-radius: 2rem;
    border: none;
    box-shadow:
      inset 0 2px 4px rgba(0, 0, 0, 0.25),
      0 1px 0 rgba(255, 255, 255, 0.25);

    width: 100%;
    height: 2.875rem;
    padding: 0 0.125rem;

    cursor: pointer;
  }

  &:focus::-webkit-slider-runnable-track {
    background: #276c30;
  }

  &::-moz-range-track {
    background: #3071a9;
    border-radius: 2rem;
    border: none;
    box-shadow:
      inset 0 2px 4px rgba(0, 0, 0, 0.25),
      0 1px 0 rgba(255, 255, 255, 0.25);

    width: 100%;
    height: 2.875rem;
    padding: 0 0.125rem;

    cursor: pointer;
  }

  &:focus::-moz-focus-outer {
    outline: none;
    border: 0;
  }

  &::-ms-track {
    background: transparent;
    border-color: transparent;
    color: transparent;

    width: 100%;
    height: 2.875rem;
    padding: 0 0.125rem;
    cursor: pointer;
  }

  &::-ms-fill-lower {
    background: #3071a9;
    border: none;
    border-radius: 2rem;
    box-shadow:
      inset 0 2px 4px rgba(0, 0, 0, 0.25),
      0 1px 0 rgba(255, 255, 255, 0.25);
  }

  &::-ms-fill-upper {
    background: #3071a9;
    border: none;
    border-radius: 2rem;
    box-shadow:
      inset 0 2px 4px rgba(0, 0, 0, 0.25),
      0 1px 0 rgba(255, 255, 255, 0.25);
  }

  &:focus::-ms-fill-lower {
    background: #3071a9;
  }

  &:focus::-ms-fill-upper {
    background: #e1edf7;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;

    background: #e0e0e0 radial-gradient(circle at center, #e0e0e0, #ffffff 70%);
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAJnUExURQAAAOXl5ePj4+Li4t7e3vv7+/////////////////////////j4+PX19eDg4Pn5+fn5+fj4+Pz8/Ofn5+fn5+vr6+3t7fn5+fr6+uDg4P39/fz8/O3t7fn5+fb29ubm5vHx8ejo6Pz8/OXl5eXl5fr6+vPz8/Dw8Pn5+erq6u/v7+np6f////r6+uLi4v////////v7+/Pz8////////////+Tk5Pj4+P///////9/f3////+/v7+Pj4+Xl5f///////9fX1/39/f////////////////////////39/f///8zMzOHh4f////r69f////Hx8e3t6v///////////+Hh4fn5/Ovr6+rq6v////b29ubm5ubm5vPz8/r6+ubm5uvr6+jo6Pz8/MzMzPb29t/f3////97e49vb2/////////////v7+/Ly8v///+fn5/z8/N/f3/z8/Pr6+ubm5tjY2OHh4f////39/ff39/Hx8fT09fz8/N3d3fr69+Dg4Pn5+e/v8f////39/f///+vr68/Pz/////T09ubm5v///////////+np6f39/fv7+/z8/P////z8/P39/f///////+bm5t7e3v////////Dw8P///+Tk5P////Hx8fz8/Nra2uXl6fz8/P39/f////////////j4+Nzc3P///+3t7fn5+tnZ3v////v7/fv7+87O2vn5+eDg4v39/f//+////////9ra5v39/f///////+vr6+fn6erq7Ozs7vr6+/r6+vj4+H9/f+zs7P////j4+P///9nZ2f///////+Pj5v////7+/zgYn/oAAADLdFJOUwB2d1pd23Fy21dW2uBxXN7d39pYdXNy39xb2lZX3FZ0cnNxWXfbVldWV3J0+nFZ3d/acgpA5lhxAkNS5XR5CunhDZK9SRAOXe6QWQUR/jgLS1njDE53xHdyMXJ7FXO9XHZZ9RSUOaRdMnD23E0+73hwCPs6PhQrBeckh6i+XG0qLJj7gzJ1EBKUfVv4D3X63+MsapHwkjNfCGla6yf9gXIjdmeTBPUoqSXogr111uFJKr10o0f3BhWNPkFOYWKX7DlyAm9GwT8p5I1JryEbrwAAA/5JREFUaN7tWtVbG0EcxBMCBJcAwTW4S6EUKVB3d3d3d3d3d3d3l8sf1YZ8Sfd2LrubA9qH3j7kZSazd9/8dvZWPDy09t+33f2HjNFVdWVyrrfodG++MSnHq0Z61TR1V8S29Zgr2Vrdyl4u///qy2+CVZIam1xSlm0qa5M5PHkSgqV1kqMFrHch8NaGWq223w0uKAcCnDKnSmlwkUS0hesUBVa1gVY7Z6oiZUUuqbNYDg6aSYLSfiUBi4wiHVTidJNR9tbLwAa5gDQD/z+aokhLkDOfohwhwZJcCl1eCQJb6E6CsJMyirKRLNVqWkCaAgJjaUojUEaATDWB7gD0JCgU0pRCoIwDmVEEugfQnqBQQFOCgXIMZGoI1A9Qf1DwpSmBQEkFGR2B6gANB4VQmhIDFAOzkyBAfUAhhKbogeIPMlEE6gloPiiE8TtJAJk0ZidxoKCnKb5AMYFMIoEWCxgfS1OigWIEmTym8Ql8T7CE45nGYwl7g0IgTSkSMD6FQCMBNYJCuprqIj3xAjSeb3wAUMJBxotAkwWM1/MHow9znHRQrHi7GSvZoBBNU8xAiWt3rATzPUHjkwg0QqCEBWIlC2Q8mbGSxTc+TMCTCAJNEjA+gD/isbqCmMZjQJr52ZXtZnUJxIqvgPF+BBolUF0xamIlmRkr4XxP9AIpTMZKoppYSReYTyIJNEWgkyI1seLHND6eP+JDBOZ4srryBOYTyK5YAeOLmZ6Y+CmsFwhIMlbSBOZ4gVjJZ3YSpaa6QtodKwb+YAwVmH7ZsZKqJlYMzBK2CMSKWU2sRDKNVxUrmcxYiRDwROBb2MgMyAqB6grjG29yM1Yy1cRKBrO6UgRiJVRNrJDjJKdjYsXA/JDASSuDb3yswMLUk/lV30GxkuRmrKTzq6vczVgp5xuf7uYSO6mzltiRzM/UVP7CVC8wTjohVnDE5zCXDgJL7FCB7EphGp+hZomd6eYS28SvrjAB4yuYC1Pj34iVzI5ZYqe1N1bMArFiYXpi0HbutJ07bedO27nTdu60nbt/tXO3Rtu5a9/OHfkFWQvoBFCYRVMKgDIAZGoJdB6gO/mHmfuAMg1khhHobEA3g8JqmjIUKNOdx/WONpg8YN5FCXTBw+PxdCcPkTPQeVxvb7klJLqdEhiOAlv7yCln6pGz1t6H820OydDeE+UvUqlwoH+CZFili0qH/ndlfVzpJ0f7yl50qeLdhGt/ri9YpUeKlPNPHH3Yft7T8Jx3VodCwVEXtywuOR/T2uCCcvWO4ymkGy8Qfvajte1Jv99c4PK+yL0H9je99dgl5eNZ+z2J1ufKN1eaf1744PfyKfPmy+kW3bnX95mUy18/3bZ8btYuG2ntFyJKg6V6+GwOAAAAAElFTkSuQmCC);
    background-repeat: no-repeat;
    background-size: 0.5rem 0.75rem;
    background-position: center center;
    border: none;
    box-shadow: 0 1px 3px rgba(50, 50, 50, 0.2);
    border-radius: 8rem;

    height: 2.625rem;
    width: 4.25rem;
    margin-top: 0px;

    cursor: pointer;
  }

  &::-moz-range-thumb {
    background: #e0e0e0 radial-gradient(circle at center, #e0e0e0, #ffffff 70%);
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAJnUExURQAAAOXl5ePj4+Li4t7e3vv7+/////////////////////////j4+PX19eDg4Pn5+fn5+fj4+Pz8/Ofn5+fn5+vr6+3t7fn5+fr6+uDg4P39/fz8/O3t7fn5+fb29ubm5vHx8ejo6Pz8/OXl5eXl5fr6+vPz8/Dw8Pn5+erq6u/v7+np6f////r6+uLi4v////////v7+/Pz8////////////+Tk5Pj4+P///////9/f3////+/v7+Pj4+Xl5f///////9fX1/39/f////////////////////////39/f///8zMzOHh4f////r69f////Hx8e3t6v///////////+Hh4fn5/Ovr6+rq6v////b29ubm5ubm5vPz8/r6+ubm5uvr6+jo6Pz8/MzMzPb29t/f3////97e49vb2/////////////v7+/Ly8v///+fn5/z8/N/f3/z8/Pr6+ubm5tjY2OHh4f////39/ff39/Hx8fT09fz8/N3d3fr69+Dg4Pn5+e/v8f////39/f///+vr68/Pz/////T09ubm5v///////////+np6f39/fv7+/z8/P////z8/P39/f///////+bm5t7e3v////////Dw8P///+Tk5P////Hx8fz8/Nra2uXl6fz8/P39/f////////////j4+Nzc3P///+3t7fn5+tnZ3v////v7/fv7+87O2vn5+eDg4v39/f//+////////9ra5v39/f///////+vr6+fn6erq7Ozs7vr6+/r6+vj4+H9/f+zs7P////j4+P///9nZ2f///////+Pj5v////7+/zgYn/oAAADLdFJOUwB2d1pd23Fy21dW2uBxXN7d39pYdXNy39xb2lZX3FZ0cnNxWXfbVldWV3J0+nFZ3d/acgpA5lhxAkNS5XR5CunhDZK9SRAOXe6QWQUR/jgLS1njDE53xHdyMXJ7FXO9XHZZ9RSUOaRdMnD23E0+73hwCPs6PhQrBeckh6i+XG0qLJj7gzJ1EBKUfVv4D3X63+MsapHwkjNfCGla6yf9gXIjdmeTBPUoqSXogr111uFJKr10o0f3BhWNPkFOYWKX7DlyAm9GwT8p5I1JryEbrwAAA/5JREFUaN7tWtVbG0EcxBMCBJcAwTW4S6EUKVB3d3d3d3d3d3d3l8sf1YZ8Sfd2LrubA9qH3j7kZSazd9/8dvZWPDy09t+33f2HjNFVdWVyrrfodG++MSnHq0Z61TR1V8S29Zgr2Vrdyl4u///qy2+CVZIam1xSlm0qa5M5PHkSgqV1kqMFrHch8NaGWq223w0uKAcCnDKnSmlwkUS0hesUBVa1gVY7Z6oiZUUuqbNYDg6aSYLSfiUBi4wiHVTidJNR9tbLwAa5gDQD/z+aokhLkDOfohwhwZJcCl1eCQJb6E6CsJMyirKRLNVqWkCaAgJjaUojUEaATDWB7gD0JCgU0pRCoIwDmVEEugfQnqBQQFOCgXIMZGoI1A9Qf1DwpSmBQEkFGR2B6gANB4VQmhIDFAOzkyBAfUAhhKbogeIPMlEE6gloPiiE8TtJAJk0ZidxoKCnKb5AMYFMIoEWCxgfS1OigWIEmTym8Ql8T7CE45nGYwl7g0IgTSkSMD6FQCMBNYJCuprqIj3xAjSeb3wAUMJBxotAkwWM1/MHow9znHRQrHi7GSvZoBBNU8xAiWt3rATzPUHjkwg0QqCEBWIlC2Q8mbGSxTc+TMCTCAJNEjA+gD/isbqCmMZjQJr52ZXtZnUJxIqvgPF+BBolUF0xamIlmRkr4XxP9AIpTMZKoppYSReYTyIJNEWgkyI1seLHND6eP+JDBOZ4srryBOYTyK5YAeOLmZ6Y+CmsFwhIMlbSBOZ4gVjJZ3YSpaa6QtodKwb+YAwVmH7ZsZKqJlYMzBK2CMSKWU2sRDKNVxUrmcxYiRDwROBb2MgMyAqB6grjG29yM1Yy1cRKBrO6UgRiJVRNrJDjJKdjYsXA/JDASSuDb3yswMLUk/lV30GxkuRmrKTzq6vczVgp5xuf7uYSO6mzltiRzM/UVP7CVC8wTjohVnDE5zCXDgJL7FCB7EphGp+hZomd6eYS28SvrjAB4yuYC1Pj34iVzI5ZYqe1N1bMArFiYXpi0HbutJ07bedO27nTdu60nbt/tXO3Rtu5a9/OHfkFWQvoBFCYRVMKgDIAZGoJdB6gO/mHmfuAMg1khhHobEA3g8JqmjIUKNOdx/WONpg8YN5FCXTBw+PxdCcPkTPQeVxvb7klJLqdEhiOAlv7yCln6pGz1t6H820OydDeE+UvUqlwoH+CZFili0qH/ndlfVzpJ0f7yl50qeLdhGt/ri9YpUeKlPNPHH3Yft7T8Jx3VodCwVEXtywuOR/T2uCCcvWO4ymkGy8Qfvajte1Jv99c4PK+yL0H9je99dgl5eNZ+z2J1ufKN1eaf1744PfyKfPmy+kW3bnX95mUy18/3bZ8btYuG2ntFyJKg6V6+GwOAAAAAElFTkSuQmCC);
    background-repeat: no-repeat;
    background-size: 0.5rem 0.75rem;
    background-position: center center;
    border: none;
    box-shadow: 0 1px 3px rgba(50, 50, 50, 0.2);
    border-radius: 8rem;

    height: 2.625rem;
    width: 4.25rem;

    cursor: pointer;
  }

  &::-ms-thumb {
    background: #e0e0e0 radial-gradient(circle at center, #e0e0e0, #ffffff 70%);
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAJnUExURQAAAOXl5ePj4+Li4t7e3vv7+/////////////////////////j4+PX19eDg4Pn5+fn5+fj4+Pz8/Ofn5+fn5+vr6+3t7fn5+fr6+uDg4P39/fz8/O3t7fn5+fb29ubm5vHx8ejo6Pz8/OXl5eXl5fr6+vPz8/Dw8Pn5+erq6u/v7+np6f////r6+uLi4v////////v7+/Pz8////////////+Tk5Pj4+P///////9/f3////+/v7+Pj4+Xl5f///////9fX1/39/f////////////////////////39/f///8zMzOHh4f////r69f////Hx8e3t6v///////////+Hh4fn5/Ovr6+rq6v////b29ubm5ubm5vPz8/r6+ubm5uvr6+jo6Pz8/MzMzPb29t/f3////97e49vb2/////////////v7+/Ly8v///+fn5/z8/N/f3/z8/Pr6+ubm5tjY2OHh4f////39/ff39/Hx8fT09fz8/N3d3fr69+Dg4Pn5+e/v8f////39/f///+vr68/Pz/////T09ubm5v///////////+np6f39/fv7+/z8/P////z8/P39/f///////+bm5t7e3v////////Dw8P///+Tk5P////Hx8fz8/Nra2uXl6fz8/P39/f////////////j4+Nzc3P///+3t7fn5+tnZ3v////v7/fv7+87O2vn5+eDg4v39/f//+////////9ra5v39/f///////+vr6+fn6erq7Ozs7vr6+/r6+vj4+H9/f+zs7P////j4+P///9nZ2f///////+Pj5v////7+/zgYn/oAAADLdFJOUwB2d1pd23Fy21dW2uBxXN7d39pYdXNy39xb2lZX3FZ0cnNxWXfbVldWV3J0+nFZ3d/acgpA5lhxAkNS5XR5CunhDZK9SRAOXe6QWQUR/jgLS1njDE53xHdyMXJ7FXO9XHZZ9RSUOaRdMnD23E0+73hwCPs6PhQrBeckh6i+XG0qLJj7gzJ1EBKUfVv4D3X63+MsapHwkjNfCGla6yf9gXIjdmeTBPUoqSXogr111uFJKr10o0f3BhWNPkFOYWKX7DlyAm9GwT8p5I1JryEbrwAAA/5JREFUaN7tWtVbG0EcxBMCBJcAwTW4S6EUKVB3d3d3d3d3d3d3l8sf1YZ8Sfd2LrubA9qH3j7kZSazd9/8dvZWPDy09t+33f2HjNFVdWVyrrfodG++MSnHq0Z61TR1V8S29Zgr2Vrdyl4u///qy2+CVZIam1xSlm0qa5M5PHkSgqV1kqMFrHch8NaGWq223w0uKAcCnDKnSmlwkUS0hesUBVa1gVY7Z6oiZUUuqbNYDg6aSYLSfiUBi4wiHVTidJNR9tbLwAa5gDQD/z+aokhLkDOfohwhwZJcCl1eCQJb6E6CsJMyirKRLNVqWkCaAgJjaUojUEaATDWB7gD0JCgU0pRCoIwDmVEEugfQnqBQQFOCgXIMZGoI1A9Qf1DwpSmBQEkFGR2B6gANB4VQmhIDFAOzkyBAfUAhhKbogeIPMlEE6gloPiiE8TtJAJk0ZidxoKCnKb5AMYFMIoEWCxgfS1OigWIEmTym8Ql8T7CE45nGYwl7g0IgTSkSMD6FQCMBNYJCuprqIj3xAjSeb3wAUMJBxotAkwWM1/MHow9znHRQrHi7GSvZoBBNU8xAiWt3rATzPUHjkwg0QqCEBWIlC2Q8mbGSxTc+TMCTCAJNEjA+gD/isbqCmMZjQJr52ZXtZnUJxIqvgPF+BBolUF0xamIlmRkr4XxP9AIpTMZKoppYSReYTyIJNEWgkyI1seLHND6eP+JDBOZ4srryBOYTyK5YAeOLmZ6Y+CmsFwhIMlbSBOZ4gVjJZ3YSpaa6QtodKwb+YAwVmH7ZsZKqJlYMzBK2CMSKWU2sRDKNVxUrmcxYiRDwROBb2MgMyAqB6grjG29yM1Yy1cRKBrO6UgRiJVRNrJDjJKdjYsXA/JDASSuDb3yswMLUk/lV30GxkuRmrKTzq6vczVgp5xuf7uYSO6mzltiRzM/UVP7CVC8wTjohVnDE5zCXDgJL7FCB7EphGp+hZomd6eYS28SvrjAB4yuYC1Pj34iVzI5ZYqe1N1bMArFiYXpi0HbutJ07bedO27nTdu60nbt/tXO3Rtu5a9/OHfkFWQvoBFCYRVMKgDIAZGoJdB6gO/mHmfuAMg1khhHobEA3g8JqmjIUKNOdx/WONpg8YN5FCXTBw+PxdCcPkTPQeVxvb7klJLqdEhiOAlv7yCln6pGz1t6H820OydDeE+UvUqlwoH+CZFili0qH/ndlfVzpJ0f7yl50qeLdhGt/ri9YpUeKlPNPHH3Yft7T8Jx3VodCwVEXtywuOR/T2uCCcvWO4ymkGy8Qfvajte1Jv99c4PK+yL0H9je99dgl5eNZ+z2J1ufKN1eaf1744PfyKfPmy+kW3bnX95mUy18/3bZ8btYuG2ntFyJKg6V6+GwOAAAAAElFTkSuQmCC);
    background-repeat: no-repeat;
    background-size: 0.5rem 0.75rem;
    background-position: center center;
    border: none;
    box-shadow: 0 1px 3px rgba(50, 50, 50, 0.2);
    border-radius: 8rem;

    height: 2.625rem;
    width: 4.25rem;

    cursor: pointer;
  }
`;

class Element extends React.PureComponent<PropsWithContext> {
  public static defaultProps = {
    variant: 'dark',
    format: value => value,
    display: value => value,
  };
  private value1 = React.createRef<HTMLSpanElement>();
  private value2 = React.createRef<HTMLSpanElement>();
  private previous;

  constructor(props) {
    super(props);

    this.previous = parseInt(props.field.value, 10);
    this.proximities = this.proximities.bind(this);
  }

  proximities(): {low: number, mid: number, high: number} {
    const { field, min, max } = this.props;

    const proximity = (value: number, point: number): number =>
      Math.min(Math.abs(point - value ), 2);

    return {
      low: (2 - proximity(field.value, min)) / 3 + 1,
      mid: (2 - proximity(field.value, (max + min) / 2)) / 3 + 1,
      high: (2 - proximity(field.value, max)) / 3 + 1,
    };
  }

  switchValue(next: number) {
    const { props, previous, value1, value2 } = this;

    const tl = new TimelineLite();
    const direction = (next < previous);

    // intial blur is based on change direction
    const blur = {distance: direction ? 0 : 10};

    tl
    .clear()
    .set(value1.current, {opacity: 0})
    .set(value2.current, {opacity: 1, zIndex: direction ? 0 : 2})
    .fromTo(value2.current, 0.5, {
      filter: 'blur(0px)',
      opacity: 1,
      scale: 1,
      x: '0px',
    }, {
      filter: `blur(${blur.distance}px)`,
      opacity: 0,
      scale: direction ? 0.25 : 1.75,
      x: direction ? '20px' : '-50px',
    })
    .fromTo(value1.current, 0.5, {
      filter: `blur(${blur.distance}px)`,
      opacity: 0,
      scale: direction ? 1.75 : 0.25,
      x: direction ? '-50px' : '20px',
    }, {
      filter: 'blur(0px)',
      opacity: 1,
      scale: 1,
      x: 0,
      clearProps: 'transform, filter, opacity',
    }, '-0.25')
    .to(blur, 1, {
      distance: direction ? 10 : 0 // to the opposite of our initial value
    });
  }

  render() {
    const {
      id,
      field,
      form,
      format,
      display,
      unit,
      min,
      max,
      step,
      label
    } = this.props;
    const { onChange, ...fieldProps} = field;

    const proximities = this.proximities();
    const invalid = !!form.errors[field.name];

    return (
      <div className={style(this.props)}>
        {label && <Label htmlFor={id} error={invalid}>{label}</Label>}
        <div className={valueStyle}>
          <div className={digitsStyle}>
            <span ref={this.value1} className={digitStyle}>{display(field.value)}</span>
            <span ref={this.value2} className={digitStyle}>{display(this.previous)}</span>
          </div>
          {unit && <span className={unitStyle}>{unit}</span>}
        </div>
        <div className={sliderStyle}>
          {min && max &&
          <div className={ruleStyle}>
            <span className={minValueStyle} data-label={display(min)} style={{
              transform: (proximities.low > 1) ? `scale(${proximities.low})` : '',
            }} />
            <span className={midValueStyle} data-label={display((max + min) / 2)} style={{
              transform: (proximities.mid > 1) ? `scale(${proximities.mid})` : '',
            }}/>
            <span className={maxValueStyle} data-label={display(max)} style={{
              transform: (proximities.high > 1) ? `scale(${proximities.high})` : '',
            }}/>
          </div>
          }
          <input
            className={inputStyle(this.props)}
            type="range"
            id={id}
            max={max}
            min={min}
            step={step}
            onChange={e => {
              const value = Math.max(Math.min(format(e.currentTarget.valueAsNumber), max), min);
              this.previous = parseInt(field.value, 10); // value is stored as a string

              form.setFieldValue(field.name, value, false);
              this.switchValue(value);
            }}
            {...fieldProps}
          />
        </div>
        <FieldFeedback error={invalid && form.errors[field.name]}/>
      </div>
    );
  }
}

const FormikRangeField = (props: Props) => (
  <Field
    component={Element}
    {...props}
  />
);

export const RangeField = withTheme<Props, Theme>(FormikRangeField);
