import React, { useState } from 'react';

const ClassifierForm = () => {
    const [formData, setFormData] = useState({
    user: {
        gender: '',
        gpa: '',
        points: '0',
        priority: '',
        direction: ''
    },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            user: {
                ...prevState.user,
                [name]: value
            }
        }));
    };

    const handleRangeChange = (e) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            user: {
                ...prevState.user,
                total_points: value
            }
        }));
    };

    const handleExamClick = (exam) => {
        let updatedExams = [...formData.user.exams];
        if (updatedExams.includes(exam)) {
            updatedExams = updatedExams.filter(e => e !== exam);
        } else {
            updatedExams.push(exam);
        }
        setFormData(prevState => ({
            ...prevState,
            user: {
                ...prevState.user,
                exams: updatedExams
            }
        }));
    };

    const handleDirectionChange = (e) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            direction: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://personal-account-fastapi.onrender.com/predict/free', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({formData})
            });

            const result = await response.json();
            alert(`Результат классификации: ${JSON.stringify(result)}`);
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке данных.');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-xl rounded-lg w-full max-w-xl">
                

                <fieldset className="space-y-4 mb-6">
                    <label className="block text-sm font-semibold">Пол:
                        <select
                            value={formData.user.gender}
                            name="gender"
                            onChange={handleChange}
                            className="w-full p-2 mt-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                            required
                        >
                            <option value="">Выберите пол</option>
                            <option value="М">Мужской</option>
                            <option value="Ж">Женский</option>
                        </select>
                    </label>

                    <label className="block text-sm font-semibold">Средний балл (GPA):
                        <input
                            type="number"
                            step="0.01"
                            value={formData.user.gpa}
                            name="gpa"
                            onChange={handleChange}
                            className="w-full p-2 mt-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </label>

                    <label className="block text-sm font-semibold">Общее количество баллов:
                        <input
                        type="range"
                        min="0"
                        max="400"
                        step="1"
                        value={formData.user.points}
                        onChange={(e) =>
                            setFormData({ ...formData, user: { ...formData.user, points: e.target.value } })
                        }
                        className="w-full mt-2"
                        />
                        <span className="text-sm">{formData.user.points} баллов</span>
                    </label>

                    <label className="block text-sm font-semibold">Приоритет:
                        <input
                            type="number"
                            step="1"
                            value={formData.user.priority}
                            name="priority"
                            onChange={handleChange}
                            className="w-full p-2 mt-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </label>    

                    <label className="block text-sm font-semibold">Направление:
                        <select
                            value={formData.direction}
                            onChange={handleDirectionChange}
                            className="w-full p-2 mt-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                            required
                        >
                            <option value="">Выберите направление</option>
                            <option value="08.03.01 Строительство">08.03.01 Строительство</option>
                            <option value="21.03.01 Нефтегазовое дело">21.03.01 Нефтегазовое дело</option>
                            <option value="15.03.04 Автоматизация технологических процессов и производств">15.03.04 Автоматизация технологических процессов и производств</option>
                            <option value="20.03.01 Техносферная безопасность">20.03.01 Техносферная безопасность</option>
                            <option value="13.03.02 Электроэнергетика и электротехника">13.03.02 Электроэнергетика и электротехника</option>
                            <option value="21.05.00 Прикладная геология, горное дело, нефтегазовое дело и геодезия">21.05.00 Прикладная геология, горное дело, нефтегазовое дело и геодезия</option>
                            <option value="09.03.00 Информатика и вычислительная техника">09.03.00 Информатика и вычислительная техника</option>
                            <option value="21.03.02 Землеустройство и кадастры">21.03.02 Землеустройство и кадастры</option>
                            <option value="09.03.02 Информационные системы и технологии">09.03.02 Информационные системы и технологии</option>
                            <option value="15.03.01 Машиностроение">15.03.01 Машиностроение</option>
                            <option value="13.03.01 Теплоэнергетика и теплотехника">13.03.01 Теплоэнергетика и теплотехника</option>
                            <option value="05.03.01 Геология">05.03.01 Геология</option>
                            <option value="21.05.06 Нефтегазовые техника и технологии">21.05.06 Нефтегазовые техника и технологии</option>
                            <option value="27.03.04 Управление в технических системах">27.03.04 Управление в технических системах</option>
                            <option value="08.05.00 Техника и технологии строительства">08.05.00 Техника и технологии строительства</option>
                            <option value="01.03.02 Прикладная математика и информатика">01.03.02 Прикладная математика и информатика</option>
                            <option value="23.03.01 Технология транспортных процессов">23.03.01 Технология транспортных процессов</option>
                            <option value="27.03.03 Системный анализ и управление">27.03.03 Системный анализ и управление</option>
                            <option value="07.03.01 Архитектура">07.03.01 Архитектура</option>
                            <option value="12.03.01 Приборостроение">12.03.01 Приборостроение</option>
                            <option value="21.05.02 Прикладная геология">21.05.02 Прикладная геология</option>
                            <option value="07.03.03 Дизайн архитектурной среды">07.03.03 Дизайн архитектурной среды</option>
                            <option value="15.03.06 Мехатроника и робототехника">15.03.06 Мехатроника и робототехника</option>
                            <option value="23.03.03 Эксплуатация транспортно-технологических машин и комплексов">23.03.03 Эксплуатация транспортно-технологических машин и комплексов</option>
                            <option value="43.03.00 Сервис и туризм">43.03.00 Сервис и туризм</option>
                            <option value="27.03.00 Управление в технических системах">27.03.00 Управление в технических системах</option>
                            <option value="23.05.01 Наземные транспортно-технологические средства">23.05.01 Наземные транспортно-технологические средства</option>
                            <option value="18.03.01 Химическая технология">18.03.01 Химическая технология</option>
                            <option value="21.05.01 Прикладная геодезия">21.05.01 Прикладная геодезия</option>
                            <option value="02.03.01 Математика и компьютерные науки">02.03.01 Математика и компьютерные науки</option>
                            <option value="12.03.04 Биотехнические системы и технологии">12.03.04 Биотехнические системы и технологии</option>
                            <option value="42.03.01 Реклама и связи с общественностью">42.03.01 Реклама и связи с общественностью</option>
                            <option value="18.03.00 Химические технологии">18.03.00 Химические технологии</option>
                        </select>
                    </label>
                </fieldset>

                <button type="submit" className="block w-full py-2 mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg">
                    Отправить
                </button>
            </form>
        </div>
    );
};

export default ClassifierForm;