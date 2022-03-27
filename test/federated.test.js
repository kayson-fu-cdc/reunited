import React from 'react';
import {render, screen} from '@testing-library/react';
// const Form = import("fed_consumer/Form");
const Button = import("federated/Button");
const ComponentInPackage = import("componentInPackage/ComponentInPackage");
const CompInSrc = import("componentInPackage/CompInSrc");



describe("Federation", function () {
  // it("is rendering Nested Suspense",async()=>{
  //   const from = await Form
  //   console.log(await suspenseRender(from.default))
  // })
  it("Testing Button from Remote", async function () {
    const Btn = (await Button).default
    render(<Btn/>);
  });


  it("Testing ComponentInPackage from Remote", async function () {
    const Comp = (await ComponentInPackage).default
    render(<Comp/>);
  });


  it("Testing CompInSrc from Remote", async function () {
    const Comp = (await CompInSrc).default
    render(<Comp/>);
    
    expect(screen.getByText("CompInSrc component")).toBeTruthy();

  });
  // it("Testing Button from Form", async function () {
  //   const Frm = (await Form).default
  //   const wrapper = mount(<Frm/>);
  //   expect(wrapper).toMatchSnapshot()
  // });
});
