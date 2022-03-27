import React from 'react';
import {render} from 'enzyme';
// const Form = import("fed_consumer/Form");
const Button = import("federated/Button");



describe("Federation", function () {
  // it("is rendering Nested Suspense",async()=>{
  //   const from = await Form
  //   console.log(await suspenseRender(from.default))
  // })
  it("Testing Button from Remote", async function () {
    const Btn = (await Button).default
    const wrapper = render(<Btn/>);
    expect(wrapper).toMatchSnapshot()
  });

  // it("Testing Button from Form", async function () {
  //   const Frm = (await Form).default
  //   const wrapper = mount(<Frm/>);
  //   expect(wrapper).toMatchSnapshot()
  // });
});
