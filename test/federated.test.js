import React from 'react';
import {render} from '@testing-library/react';
// const Form = import("fed_consumer/Form");
const Button = import("federated/Button");
const ComponentInPackage = import("componentInPackage/ComponentInPackage");



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
  // it("Testing Button from Form", async function () {
  //   const Frm = (await Form).default
  //   const wrapper = mount(<Frm/>);
  //   expect(wrapper).toMatchSnapshot()
  // });
});
