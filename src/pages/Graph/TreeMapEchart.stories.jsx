import TreeMapEchart from '.';
import data from '../../static/treeData.json'

export default {
    title: 'TreeMapEchart',
    component: TreeMapEchart,
};

const Template = (args) => <TreeMapEchart {...args} />;

export const Default = Template.bind({});
Default.args = {
    data: data,
};