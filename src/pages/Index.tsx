import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      text: "Какое оружие ты предпочитаешь в Minecraft?",
      answers: [
        { text: "Алмазный меч", trait: "Воин" },
        { text: "Лук", trait: "Снайпер" },
        { text: "Топор", trait: "Берсерк" },
        { text: "Трезубец", trait: "Морской волк" }
      ]
    },
    {
      id: 2,
      text: "Как ты предпочитаешь играть?",
      answers: [
        { text: "Один, исследую мир", trait: "Одиночка" },
        { text: "С командой друзей", trait: "Командный игрок" },
        { text: "Строю масштабные проекты", trait: "Архитектор" },
        { text: "PvP сражения", trait: "Гладиатор" }
      ]
    },
    {
      id: 3,
      text: "Что тебя больше всего привлекает в RTX?",
      answers: [
        { text: "Красивая графика", trait: "Эстет" },
        { text: "Реалистичные тени", trait: "Перфекционист" },
        { text: "Отражения в воде", trait: "Романтик" },
        { text: "Общая атмосфера", trait: "Атмосферщик" }
      ]
    },
    {
      id: 4,
      text: "Твоя роль в команде:",
      answers: [
        { text: "Лидер и стратег", trait: "Лидер" },
        { text: "Добытчик ресурсов", trait: "Шахтёр" },
        { text: "Защитник базы", trait: "Защитник" },
        { text: "Разведчик новых земель", trait: "Исследователь" }
      ]
    }
  ];

  const clanMembers = [
    {
      name: "Kirillzin333",
      rank: "Капитан",
      level: 95,
      specialty: "Лидер",
      avatar: "⚡"
    },
    {
      name: "klinok_07",
      rank: "Заместитель", 
      level: 78,
      specialty: "Архитектор",
      avatar: "💎"
    },
    {
      name: "ShadowBlade",
      rank: "Сержант",
      level: 74,
      specialty: "Снайпер",
      avatar: "🏹"
    },
    {
      name: "NetherKing",
      rank: "Рядовой",
      level: 52,
      specialty: "Шахтёр",
      avatar: "🔥"
    }
  ];

  const handleAnswer = (answerText: string, trait: string) => {
    const newAnswers = [...answers, trait];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const getResult = () => {
    const traitCounts: { [key: string]: number } = {};
    answers.forEach(trait => {
      traitCounts[trait] = (traitCounts[trait] || 0) + 1;
    });
    
    const dominantTrait = Object.keys(traitCounts).reduce((a, b) => 
      traitCounts[a] > traitCounts[b] ? a : b
    );
    
    const descriptions: { [key: string]: string } = {
      "Воин": "Ты прирождённый боец! Всегда в первых рядах.",
      "Снайпер": "Точность и терпение - твои главные козыри.",
      "Лидер": "Ты рождён командовать и вести за собой других.",
      "Архитектор": "Твоё призвание - создавать прекрасные постройки.",
      "Защитник": "Надёжный тыл команды, всегда защитишь союзников.",
      "Исследователь": "Первопроходец, открывающий новые горизонты."
    };
    
    return {
      trait: dominantTrait,
      description: descriptions[dominantTrait] || "Уникальный игрок с разносторонними навыками!"
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-green-800 to-green-900 text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b-4 border-minecraft-green">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/img/d5661077-389a-4295-b91c-c0635699f584.jpg" 
                alt="RTX Clan Logo" 
                className="w-12 h-12 pixelated"
              />
              <div>
                <h1 className="minecraft-text text-3xl text-minecraft-green">
                  КЛАН RTX
                </h1>
                <p className="text-green-300 text-sm">Элитный клан Minecraft</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-minecraft-green text-black font-bold px-4 py-2">
              Активных: 24
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        {!showResult && currentQuestion === 0 && (
          <div className="text-center mb-12">
            <div className="inline-block bg-black/30 backdrop-blur-sm rounded-lg p-8 border-4 border-minecraft-green/50">
              <h2 className="minecraft-text text-5xl mb-4 text-minecraft-green">
                ТЕСТ НА ВСТУПЛЕНИЕ
              </h2>
              <p className="text-xl mb-6 text-green-100">
                Пройди тест и узнай, подходишь ли ты для клана RTX!
              </p>
              <div className="flex justify-center space-x-4 mb-6">
                <Icon name="Sword" className="text-minecraft-green" size={32} />
                <Icon name="Shield" className="text-minecraft-green" size={32} />
                <Icon name="Gem" className="text-minecraft-green" size={32} />
              </div>
              <Button 
                onClick={() => setCurrentQuestion(1)}
                className="minecraft-button minecraft-text text-xl px-8 py-4 text-white"
              >
                Начать тест
              </Button>
            </div>
          </div>
        )}

        {/* Test Questions */}
        {!showResult && currentQuestion > 0 && (
          <Card className="max-w-2xl mx-auto bg-black/40 backdrop-blur-sm border-4 border-minecraft-green">
            <CardHeader className="text-center">
              <CardTitle className="minecraft-text text-2xl text-minecraft-green">
                Вопрос {currentQuestion} из {questions.length}
              </CardTitle>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                <div 
                  className="bg-minecraft-green h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                ></div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-xl text-center mb-6 text-white">
                {questions[currentQuestion - 1].text}
              </h3>
              <div className="grid gap-3">
                {questions[currentQuestion - 1].answers.map((answer, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(answer.text, answer.trait)}
                    variant="outline"
                    className="minecraft-button text-left p-4 h-auto text-white border-minecraft-green hover:bg-minecraft-green/20"
                  >
                    {answer.text}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Test Result */}
        {showResult && (
          <div className="max-w-2xl mx-auto">
            <Card className="bg-black/40 backdrop-blur-sm border-4 border-minecraft-green mb-8">
              <CardHeader className="text-center">
                <CardTitle className="minecraft-text text-3xl text-minecraft-green">
                  Результат теста
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="minecraft-text text-2xl text-minecraft-green">
                  Ты - {getResult().trait}!
                </h3>
                <p className="text-lg text-green-100">
                  {getResult().description}
                </p>
                <div className="flex justify-center space-x-4 mt-6">
                  <Button 
                    onClick={resetTest}
                    variant="outline"
                    className="minecraft-button text-white border-minecraft-green"
                  >
                    Пройти ещё раз
                  </Button>
                  <Button className="minecraft-button bg-minecraft-green text-black hover:bg-minecraft-green-dark">
                    Подать заявку в клан
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Clan Members Section */}
        <div className="mt-16">
          <h2 className="minecraft-text text-3xl text-center mb-8 text-minecraft-green">
            УЧАСТНИКИ КЛАНА
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clanMembers.map((member, index) => (
              <Card key={index} className="bg-black/40 backdrop-blur-sm border-2 border-minecraft-green/50 hover:border-minecraft-green transition-all">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{member.avatar}</div>
                  <h3 className="minecraft-text text-lg text-minecraft-green mb-2">
                    {member.name}
                  </h3>
                  <Badge variant="secondary" className="bg-minecraft-green/20 text-minecraft-green mb-2">
                    {member.rank}
                  </Badge>
                  <p className="text-sm text-green-200 mb-2">
                    Уровень: {member.level}
                  </p>
                  <p className="text-xs text-green-300">
                    {member.specialty}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* About Clan Section */}
        <div className="mt-16 mb-8">
          <Card className="bg-black/40 backdrop-blur-sm border-4 border-minecraft-green">
            <CardHeader>
              <CardTitle className="minecraft-text text-2xl text-center text-minecraft-green">
                О КЛАНЕ RTX
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-green-100">
              <p>
                Клан RTX - это элитное сообщество игроков Minecraft, которые ценят качество графики и командную игру. 
                Мы исследуем миры с включённым RTX, строим невероятные постройки и участвуем в PvP турнирах.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-minecraft-green/10 rounded-lg border border-minecraft-green/30">
                  <Icon name="Users" className="text-minecraft-green mx-auto mb-2" size={32} />
                  <h4 className="minecraft-text text-minecraft-green">Команда</h4>
                  <p className="text-sm">Дружная команда профи</p>
                </div>
                <div className="text-center p-4 bg-minecraft-green/10 rounded-lg border border-minecraft-green/30">
                  <Icon name="Trophy" className="text-minecraft-green mx-auto mb-2" size={32} />
                  <h4 className="minecraft-text text-minecraft-green">Турниры</h4>
                  <p className="text-sm">Участие в соревнованиях</p>
                </div>
                <div className="text-center p-4 bg-minecraft-green/10 rounded-lg border border-minecraft-green/30">
                  <Icon name="Home" className="text-minecraft-green mx-auto mb-2" size={32} />
                  <h4 className="minecraft-text text-minecraft-green">База</h4>
                  <p className="text-sm">Крутая база клана</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;