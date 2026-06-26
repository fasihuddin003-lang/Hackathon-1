# ماڈیول 4: Vision-Language-Action (VLA)

**فوکس: LLMs اور روبوٹکس کا سنگم۔**

## جائزہ

Vision-Language-Action ماڈلز روبوٹکس AI کی جدید ترین ٹیکنالوجی کی نمائندگی کرتے ہیں۔ یہ کمپیوٹر وژن، نیچرل لینگویج انڈرسٹینڈنگ اور موٹر کنٹرول کو ایک متحد سسٹم میں ملا دیتے ہیں جو کمانڈز کو سمجھ سکتا ہے، ماحول کو دیکھ سکتا ہے اور فزیکل ایکشن لے سکتا ہے۔

## OpenAI Whisper کے ساتھ وائس ٹو ایکشن

Whisper OpenAI کا اسپیچ ریکگنیشن ماڈل ہے جو وائس کمانڈز کو ٹیکسٹ میں تبدیل کرتا ہے:

```python
import whisper

model = whisper.load_model("base")
result = model.transcribe("clean the room")
print(result["text"])  # "clean the room"
```

## LLMs کے ساتھ کوگنیٹو پلاننگ

بڑے لینگویج ماڈلز نیچرل لینگویج کمانڈز کو ROS 2 ایکشنز کی ترتیب میں تبدیل کرتے ہیں:

```python
import openai

def plan_action(command: str) -> list:
    prompt = f"""اس کمانڈ کو ROS 2 ایکشنز کی ترتیب میں تبدیل کریں:
کمانڈ: '{command}'
ایکشنز:
1."""
    response = openai.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content
```

### مثال: "کمرہ صاف کرو"

1. کمرے تک نیویگیٹ کریں (Nav2 پاتھ پلاننگ)
2. کمپیوٹر وژن کا استعمال کرتے ہوئے اشیاء کی شناخت کریں (YOLO/SAM)
3. مینیپولیشن سکلز کا استعمال کرتے ہوئے اشیاء اٹھائیں
4. اشیاء کو مخصوص جگہوں پر رکھیں

## ملٹی موڈل انٹریکشن

جدید ہیومنائیڈ روبوٹس یکجا کرتے ہیں:
- **اسپیچ**: نیچرل لینگویج کمانڈز اور جوابات
- **جیسچر**: غیر زبانی کمیونیکیشن
- **وژن**: ماحول میں موجود اشیاء اور لوگوں کو سمجھنا

## کیپسٹون پروجیکٹ: خود مختار ہیومنائیڈ

ایک سمیلیٹڈ روبوٹ جو:
1. وائس کمانڈ وصول کرتا ہے
2. LLM-based کوگنیٹو پلاننگ کا استعمال کرتے ہوئے راستہ پلان کرتا ہے
3. Nav2 کا استعمال کرتے ہوئے رکاوٹوں سے بچتا ہے
4. کمپیوٹر وژن کا استعمال کرتے ہوئے اشیاء کی شناخت کرتا ہے
5. روبوٹک بازوؤں/ہاتھوں کا استعمال کرتے ہوئے اشیاء کو ہینڈل کرتا ہے

```python
class AutonomousHumanoid:
    def __init__(self):
        self.ear = SpeechRecognizer()
        self.brain = CognitivePlanner()
        self.eyes = VisionSystem()
        self.body = RobotController()

    def execute_command(self):
        command = self.ear.listen()
        plan = self.brain.plan(command)
        for step in plan:
            if step.type == "navigate":
                self.body.navigate(step.target)
            elif step.type == "grasp":
                obj = self.eyes.detect(step.object)
                self.body.grasp(obj)
```

## خلاصہ

VLA ماڈلز LLMs کی استدلال کی صلاحیت کو فزیکل ایکشن کی صلاحیتوں کے ساتھ ملا کر روبوٹکس میں انقلاب لا رہے ہیں، جس سے روبوٹس پیچیدہ انسانی کمانڈز کو سمجھ اور انجام دے سکتے ہیں۔
