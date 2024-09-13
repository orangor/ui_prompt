import React, { useState } from 'react';
import { PersonalCard} from "../../components/claude"

// 函数组件
const GeometricMeanCalculator = function() {
  // 状态管理
  const [numbers, setNumbers] = useState<string>('');
  const [geometricMean, setGeometricMean] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 计算几何平均数
  const calculateGeometricMean = (numbers: string) => {
    const numArray = numbers.split('/').map(Number).filter(n => !isNaN(n) && n > 0);
    if (numArray.length === 0) {
      setError('请输入有效的正数，用斜杠(/)分隔。');
      setGeometricMean(null);
      return;
    }
    const product = numArray.reduce((acc, val) => acc * val, 1);
    const mean = Math.pow(product, 1 / numArray.length);
    setGeometricMean(mean);
    setError(null);
  };

  // 处理输入变化
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumbers(event.target.value);
  };

  // 处理表单提交
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    calculateGeometricMean(numbers);
  };

  return (
    <div>
      <h1>几何平均数计算器</h1>
      <form onSubmit={handleSubmit}>
        <label>
          输入数字（用斜杠(/)分隔）:
          <input
            type="text"
            value={numbers}
            onChange={handleInputChange}
            placeholder="例如: 1/2/3/4"
          />
        </label>
        <button type="submit">计算</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {geometricMean !== null && (
        <h2>几何平均数: {geometricMean.toFixed(4)}</h2>
      )}
      <PersonalCard/>
    </div>
  );
};

export { GeometricMeanCalculator };
