import type { Meta, StoryObj } from '@storybook/react';
import { Section, SectionTitle, SectionUtil } from './Section';

const meta: Meta<typeof Section> = {
  title: 'Components/Section',
  tags: ['autodocs'],
  component: Section,
  argTypes: {
    className: { control: 'text' },
    children: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Section>;

export const 기본섹션_타이틀: Story = {
  args: {
    children: '기본 섹션 타이틀',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '간단하게 섹션 타이틀을 사용하는 예제',
      },
    },
  },
};
기본섹션_타이틀.storyName = 'Primary';

export const 타이틀_커스텀_섹션: Story = {
  render: () => (
    <Section>
      <SectionTitle className='text-blue-500'>커스텀 타이틀</SectionTitle>
    </Section>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'SectionTitle을 커스텀 클래스로 스타일링하는 예제 (SectionTitle에 className을 추가)',
      },
    },
  },
};

export const 유틸_포함_섹션: Story = {
  render: () => (
    <Section className='w-[300px]'>
      <SectionTitle>유틸 포함 섹션</SectionTitle>
      <SectionUtil>옵션</SectionUtil>
    </Section>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Section 안에서 SectionTitle, SectionUtil을 사용하는 예제 (SectionUtil태그에 children으로 우측 컨텐츠 추가)',
      },
    },
  },
};
